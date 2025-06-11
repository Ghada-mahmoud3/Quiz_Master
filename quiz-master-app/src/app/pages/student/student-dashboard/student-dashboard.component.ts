import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { Exam } from '../../../models/exam.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  upcomingExams: any[] = [];
  recentResults: any[] = [];
  stats = {
    enrolledCourses: 5,
    completedExams: 3,
    averageScore: 87,
    attendance: '95%'
  };
  sidebarVisible = true;
  sidebarMinimized = false;
  isToggled = true;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.examService.getExams().subscribe({
      next: (exams) => {
        this.upcomingExams = exams
          .slice(0, 3)
          .map((exam: Exam) => ({
            id: exam.id,
            title: exam['exam-name'],
            subject: exam.category,
            duration: exam.time,
            dueDate: exam.dueDate,
            questions: exam.questions
          }));
      },
      error: (err) => console.error('Failed to load exams:', err)
    });

    this.recentResults = [
      { examId: '1', title: 'Mathematics Final', score: 92, date: '2023-11-15' },
      { examId: '2', title: 'Physics Midterm', score: 85, date: '2023-10-20' },
      { examId: '3', title: 'Chemistry Quiz', score: 78, date: '2023-10-05' }
    ];
  }

  getDaysLeft(dueDate: string): number {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDueDateClass(daysLeft: number): string {
    if (daysLeft <= 3) return 'bg-red-100 text-red-800';
    if (daysLeft <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  }

  getPerformanceClass(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    return 'text-red-600';
  }

  getSubjectIcon(subject: string): string {
    const icons: { [key: string]: string } = {
      'Mathematics': 'https://cdn-icons-png.flaticon.com/512/2201/2201570.png',
      'Physics': 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
      'Chemistry': 'https://cdn-icons-png.flaticon.com/512/2534/2534727.png',
      'Biology': 'https://cdn-icons-png.flaticon.com/512/3079/3079158.png'
    };
    return icons[subject] || 'https://cdn-icons-png.flaticon.com/512/2913/2913109.png';
  }

  toggleIcon() {
    this.isToggled = !this.isToggled;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleMinimize() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }
}