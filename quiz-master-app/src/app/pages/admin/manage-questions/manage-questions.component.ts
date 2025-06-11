import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Exam, Question } from '../../../models/exam.model';

@Component({
  selector: 'app-manage-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit, OnDestroy {
  exam: Exam | null = null;
  questionForm: FormGroup;
  examForm: FormGroup;
  showModal: boolean = false;
  editQuestionIndex: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private route: ActivatedRoute
  ) {
    this.questionForm = this.fb.group({
      qName: ['', Validators.required],
      points: [10, [Validators.required, Validators.min(1)]],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correctAnswer: ['', Validators.required]
    });

    this.examForm = this.fb.group({
      examName: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      attemptNumber: [1, [Validators.required, Validators.min(1)]],
      passMark: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
      time: [30, [Validators.required, Validators.min(1)]]
    });

    // Ensure correctAnswer updates with valid options
    this.options.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(values => {
      const validOptions = values.filter((v: string) => v);
      const currentCorrect = this.questionForm.get('correctAnswer')?.value;
      if (validOptions.length > 0 && !validOptions.includes(currentCorrect)) {
        this.questionForm.get('correctAnswer')?.setValue(validOptions[0], { emitEvent: false });
      } else if (validOptions.length === 0) {
        this.questionForm.get('correctAnswer')?.setValue('', { emitEvent: false });
      }
    });
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');
    if (examId) {
      this.examService.getExam(examId).subscribe({
        next: (data) => {
          this.exam = { ...data, questions: data.questions || [] };
          console.log('Loaded exam:', this.exam);
          this.examForm.patchValue({
            examName: data['exam-name'],
            description: data.description,
            category: data.category,
            attemptNumber: data['attempt-number'],
            passMark: data['pass-mark'],
            time: data.time
          });
        },
        error: (err) => console.error('Failed to load exam:', err)
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addQuestion(): void {
    console.log('addQuestion called, form valid:', this.questionForm.valid);
    console.log('Form values:', this.questionForm.value);
    if (this.questionForm.valid) {
      const question: Question = {
        'q-name': this.questionForm.get('qName')?.value,
        'q-number': this.exam!.questions.length + 1,
        points: Number(this.questionForm.get('points')?.value),
        options: this.questionForm.get('options')?.value,
        'correct-answer': this.questionForm.get('correctAnswer')?.value
      };
      console.log('New question:', question);

      if (this.editQuestionIndex !== null) {
        this.exam!.questions[this.editQuestionIndex] = question;
        this.editQuestionIndex = null;
      } else {
        this.exam!.questions.push(question);
      }
      console.log('Updated exam questions:', this.exam!.questions);

      this.updateExam();
      this.resetQuestionForm();
    } else {
      console.log('Form errors:', this.questionForm.errors);
      Object.keys(this.questionForm.controls).forEach(key => {
        const controlErrors = this.questionForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Control ${key} errors:`, controlErrors);
        }
      });
    }
  }

  editQuestion(index: number): void {
    const question = this.exam!.questions[index];
    this.questionForm.patchValue({
      qName: question['q-name'],
      points: question.points,
      options: question.options,
      correctAnswer: question['correct-answer']
    });
    this.editQuestionIndex = index;
  }

  deleteQuestion(index: number): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.exam!.questions.splice(index, 1);
      this.exam!.questions.forEach((q: Question, i: number) => q['q-number'] = i + 1);
      this.updateExam();
    }
  }

  resetQuestionForm(): void {
    this.questionForm.reset({
      qName: '',
      points: 10,
      options: ['', '', '', ''],
      correctAnswer: ''
    });
    this.options.controls.forEach(control => control.markAsUntouched());
    this.editQuestionIndex = null;
  }

  showEditInfoModal(): void {
    this.showModal = true;
  }

  updateExamInfo(): void {
    if (this.examForm.valid) {
      this.exam!['exam-name'] = this.examForm.get('examName')?.value;
      this.exam!.description = this.examForm.get('description')?.value;
      this.exam!.category = this.examForm.get('category')?.value;
      this.exam!['attempt-number'] = Number(this.examForm.get('attemptNumber')?.value);
      this.exam!['pass-mark'] = Number(this.examForm.get('passMark')?.value);
      this.exam!.time = Number(this.examForm.get('time')?.value);
      this.updateExam();
      this.showModal = false;
    }
  }

  private updateExam(): void {
    this.exam!['questions-number'] = this.exam!.questions.length;
    console.log('Updating exam:', this.exam);
    this.examService.updateExam(this.exam!.id, this.exam!).subscribe({
      next: () => {
        console.log('Exam updated successfully');
        this.examService.getExam(this.exam!.id).subscribe({
          next: (data) => {
            this.exam = data;
            console.log('Reloaded exam:', this.exam);
          },
          error: (err) => console.error('Failed to reload exam:', err)
        });
      },
      error: (err) => console.error('Failed to update exam:', err)
    });
  }
}