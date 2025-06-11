import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-exam-attempt',
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-attempt.component.html',
  styleUrl: './exam-attempt.component.css'
})
export class ExamAttemptComponent implements OnInit{
  examId!: string;
  exam: any;
  currentQuestionIndex = 0;
  answers: {[key: number]: string} = {};
  timeLeft!: number;
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
    this.exam = this.examService.getExamById(this.examId);
    this.timeLeft = this.exam.duration * 60; // Convert minutes to seconds
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.submitExam();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.exam.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  checkUnansweredQuestions(): number[] {
    return this.exam.questions
      .map((q: any, i: number) => i)
      //.filter((i) => !this.answers[i]);
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
