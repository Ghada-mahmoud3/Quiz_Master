import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-student-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent implements OnInit {
  results: any[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.getExams().subscribe({
      next: (exams) => {
        const teacherId = localStorage.getItem('id');
        const teacherExams = exams.filter((exam: any) => exam.teacherId === teacherId);
        this.examService.getStudent('').subscribe({
          next: (students) => {
            this.results = students.flatMap((student: any) =>
              student['attempt-exams']
                .filter((attempt: any) => teacherExams.some((exam: any) => exam.id === attempt['exam-id']))
                .map((attempt: any) => ({
                  studentId: student.id,
                  studentName: student['stu-name'],
                  'exam-name': attempt['exam-name'],
                  score: attempt.score,
                  status: attempt.status,
                  'completed-date': attempt['completed-date'],
                  'attempt-number': attempt['attempt-number']
                }))
            );
          },
          error: (err) => console.error('Failed to load students:', err)
        });
      },
      error: (err) => console.error('Failed to load exams:', err)
    });
  }
}