import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-show-result',
  imports: [CommonModule, RouterLink],
  templateUrl: './show-result.component.html',
  styleUrl: './show-result.component.css'
})
export class ShowResultComponent implements OnInit {
  examId!: string;
  exam: any;
  score!: number;
  answers: any;
  correctCount = 0;
  wrongCount = 0;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id')!;
    const navigation = window.history.state;
    this.score = navigation.score;
    this.answers = navigation.answers;
    this.loadExam();
    this.calculateResults();
  }

  loadExam() {
    this.exam = this.examService.getExamById(this.examId);
  }

  calculateResults() {
    this.correctCount = 0;
    this.wrongCount = 0;
    
    this.exam.questions.forEach((q: any, i: number) => {
      if (this.answers[i] === q.correctAnswer) {
        this.correctCount++;
      } else if (this.answers[i]) {
        this.wrongCount++;
      }
    });
  }

  getQuestionStatus(index: number): string {
    if (!this.answers[index]) return 'unanswered';
    return this.answers[index] === this.exam.questions[index].correctAnswer ? 'correct' : 'wrong';
  }

}
