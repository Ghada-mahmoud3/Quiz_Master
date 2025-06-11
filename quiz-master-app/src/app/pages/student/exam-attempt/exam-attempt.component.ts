import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../services/exam.service';
import { MappedExam } from '../../../models/exam.model';

@Component({
  selector: 'app-exam-attempt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-attempt.component.html',
  styleUrls: ['./exam-attempt.component.css']
})
export class ExamAttemptComponent implements OnInit, OnDestroy {
  examId!: string;
  exam: MappedExam | null = null;
  currentQuestionIndex = 0;
  answers: { [key: number]: string } = {};
  timeLeft?: number;
  timer: any;
  showSubmitModal = false;
  unansweredQuestions: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    this.loadExam();
  }

  loadExam() {
    this.examService.getExam(this.examId).subscribe({
      next: (data) => {
        this.exam = {
          id: data.id,
          title: data['exam-name'],
          subject: data.category,
          duration: data.time,
          dueDate: data.dueDate,
          questionsNumber: data['questions-number'],
          attemptNumber: data['attempt-number'],
          passMark: data['pass-mark'],
          description: data.description,
          teacherId: data.teacherId,
          questions: data.questions.map((q: any) => ({
            text: q['q-name'],
            number: q['q-number'],
            points: q.points,
            options: q.options,
            correctAnswer: q['correct-answer']
          }))
        };
        if (this.exam) {
          this.timeLeft = this.exam.duration * 60;
          this.startTimer();
        }
      },
      error: (err) => console.error('Failed to load exam:', err)
    });
  }

  startTimer() {
    if (this.timeLeft !== undefined) {
      this.timer = setInterval(() => {
        if (this.timeLeft !== undefined) {
          this.timeLeft--;
          if (this.timeLeft <= 0) {
            clearInterval(this.timer);
            this.submitExam();
          }
        }
      }, 1000);
    }
  }

  formatTime(seconds: number | undefined): string {
    if (seconds === undefined) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  nextQuestion() {
    if (this.exam && this.currentQuestionIndex < this.exam.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  checkUnansweredQuestions(): number[] {
    if (!this.exam) return [];
    return this.exam.questions
      .map((q: any, i: number) => i)
      .filter((i) => !this.answers[i]);
  }

  openSubmitModal() {
    this.unansweredQuestions = this.checkUnansweredQuestions();
    this.showSubmitModal = true;
  }

  submitExam() {
    clearInterval(this.timer);
    const score = this.calculateScore();
    this.router.navigate(['/student/result', this.examId], {
      state: { score, answers: this.answers }
    });
  }

  calculateScore(): number {
    if (!this.exam) return 0;
    let correct = 0;
    this.exam.questions.forEach((q: any, i: number) => {
      if (this.answers[i] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / this.exam.questions.length) * 100);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}