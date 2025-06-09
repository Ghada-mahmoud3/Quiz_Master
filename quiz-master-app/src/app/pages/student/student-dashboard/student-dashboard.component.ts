import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  constructor(private auth: AuthService) {}
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.auth.logout();
  }
}
