import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public teacherName: string = '';
  public exams: any[] = [];

  constructor(
    private auth: AuthService,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.teacherName = localStorage.getItem('name') ?? 'Teacher';
      this.examService.getExams().subscribe({
        next: (data) => {
          const teacherId = localStorage.getItem('id');
          this.exams = data.filter((exam: any) => exam.teacherId === teacherId);
        },
        error: (err) => console.error('Failed to load exams:', err)
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.auth.logout();
  }
}