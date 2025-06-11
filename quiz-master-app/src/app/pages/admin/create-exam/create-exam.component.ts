import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent {
  examForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private router: Router
  ) {
    this.examForm = this.fb.group({
      examName: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      attemptNumber: [1, [Validators.required, Validators.min(1)]],
      passMark: [70, [Validators.required, Validators.min(0), Validators.max(100)]],
      time: [30, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.examForm.valid) {
      const exam = {
        id: Math.random().toString(36).substr(2, 9),
        'exam-name': this.examForm.get('examName')?.value,
        description: this.examForm.get('description')?.value,
        category: this.examForm.get('category')?.value,
        'attempt-number': Number(this.examForm.get('attemptNumber')?.value),
        'questions-number': 0,
        'pass-mark': Number(this.examForm.get('passMark')?.value),
        time: Number(this.examForm.get('time')?.value),
        teacherId: localStorage.getItem('id'),
        questions: []
      };
      this.examService.createExam(exam).subscribe({
        next: () => this.router.navigate(['/admin/exams']),
        error: (err) => console.error('Failed to create exam:', err)
      });
    }
  }
}