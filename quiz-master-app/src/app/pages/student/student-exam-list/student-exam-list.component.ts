import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../services/exam.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-exam-list',
  imports: [SidebarComponent, CommonModule, RouterLink],
  templateUrl: './student-exam-list.component.html',
  styleUrl: './student-exam-list.component.css'
})
export class StudentExamListComponent implements OnInit {
  constructor(private auth: AuthService, private examService: ExamService) { }

  sidebarVisible = true;
  sidebarMinimized = false;
  isToggled = true;
  exams: any[] = []

  toggleIcon() {
    this.isToggled = !this.isToggled;
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleMinimize() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }
  ngOnInit() {
    this.exams = this.examService.getAllExams();
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

}
