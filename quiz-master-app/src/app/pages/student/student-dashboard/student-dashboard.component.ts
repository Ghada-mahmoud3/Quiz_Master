import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ExamService } from '../../../services/exam.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, SidebarComponent, RouterModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  constructor(private examService: ExamService) { }
  
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

  getDueDateClass(daysLeft: number) {
    return {
      'bg-red-100 text-red-800': daysLeft <= 3,
      'bg-yellow-100 text-yellow-800': daysLeft > 3 && daysLeft <= 7,
      'bg-green-100 text-green-800': daysLeft > 7
    };
  }
  ngOnInit() {
    this.upcomingExams = this.examService.getAllExams()
      .slice(0, 3) 
      .map(exam => ({
        ...exam,
      }));
    this.recentResults = [
      { examId: '1', title: 'Mathematics Final', score: 92, date: '2023-11-15' },
      { examId: '2', title: 'Physics Midterm', score: 85, date: '2023-10-20' },
      { examId: '3', title: 'Chemistry Quiz', score: 78, date: '2023-10-05' }
    ];
  }
  getPerformanceClass(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    return 'text-red-600';
  }
  getSubjectIcon(subject: string): string {
  const icons: {[key: string]: string} = {
    'Mathematics': 'https://cdn-icons-png.flaticon.com/512/2201/2201570.png',
    'Physics': 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
    'Chemistry': 'https://cdn-icons-png.flaticon.com/512/2534/2534727.png',
    'Biology': 'https://cdn-icons-png.flaticon.com/512/3079/3079158.png'
  };
  return icons[subject] || 'https://cdn-icons-png.flaticon.com/512/2913/2913109.png';
}

  /* Minimize Button */
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
