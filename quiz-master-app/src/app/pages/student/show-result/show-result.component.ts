import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { MappedExam } from '../../../models/exam.model';

@Component({
  selector: 'app-show-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {
  examId?: string;
  exam: MappedExam | null = null;
  score?: number;
  answers: { [key: number]: string } = {};
  correctCount = 0;
  wrongCount = 0;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id') || undefined;
    const navigation = window.history.state;
    this.score = navigation.score;
    this.answers = navigation.answers || {};
    this.loadExam();
    this.calculateResults();
  }

  loadExam() {
    if (this.examId) {
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
        },
        error: (err) => console.error('Failed to load exam:', err)
      });
    }
  }

  calculateResults() {
    if (!this.exam) return;
    this.correctCount = 0;
    this.wrongCount = 0;

    this.exam.questions.forEach((q, i: number) => {
      if (this.answers[i] === q.correctAnswer) {
        this.correctCount++;
      } else if (this.answers[i]) {
        this.wrongCount++;
      }
    });
  }

  getQuestionStatus(index: number): string {
    if (!this.exam || !this.answers[index]) return 'unanswered';
    return this.answers[index] === this.exam.questions[index].correctAnswer ? 'correct' : 'wrong';
  }
}