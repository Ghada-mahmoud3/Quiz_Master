import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private auth: AuthService) {}
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.auth.logout();
  }
}
