import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../services/exam.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-result-list',
  imports: [SidebarComponent, CommonModule, RouterLink],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.css'
})
export class ResultListComponent implements OnInit {
  constructor(private examService: ExamService) { }
  sidebarVisible = true;
  sidebarMinimized = false;
  isToggled = true;

  stats = {
    enrolledCourses: 5,
    completedExams: 3,
    averageScore: 87,
    attendance: '95%'
  };

  /* Minimize Btn */
  toggleIcon() {
    this.isToggled = !this.isToggled;
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleMinimize() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }

  /* Result List */
  upcomingExams: any[] = [];
  recentResults: any[] = [];

  ngOnInit() {
    this.upcomingExams = this.examService.getAllExams()
      .slice(0, 3) 
      .map(exam => ({
        ...exam,
        daysLeft: this.getDaysLeft(exam.dueDate)
      }));
    this.recentResults = [
      { examId: '1', title: 'Mathematics Final', score: 92, date: '2023-11-15' },
      { examId: '2', title: 'Physics Midterm', score: 85, date: '2023-10-20' },
      { examId: '3', title: 'Chemistry Quiz', score: 78, date: '2023-10-05' }
    ];
  }
  private getDaysLeft(dueDate: string): number {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  getPerformanceClass(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    return 'text-red-600';
  }
}
