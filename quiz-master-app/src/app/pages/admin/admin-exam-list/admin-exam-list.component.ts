import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-admin-exam-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-exam-list.component.html',
  styleUrls: ['./admin-exam-list.component.css']
})
export class AdminExamListComponent implements OnInit {
  public exams: any[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit() {
    const teacherId = localStorage.getItem('id');
    this.examService.getExams().subscribe({
      next: (data) => this.exams = data.filter(exam => exam.teacherId === teacherId),
      error: (err) => console.error('Failed to load exams:', err)
    });
  }

  deleteExam(id: string) {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(id).subscribe({
        next: () => this.exams = this.exams.filter(exam => exam.id !== id),
        error: (err) => console.error('Failed to delete exam:', err)
      });
    }
  }
}