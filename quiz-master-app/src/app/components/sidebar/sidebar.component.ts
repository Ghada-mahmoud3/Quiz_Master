import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() visible: boolean = true;
  @Input() minimized: boolean = false;
  @Output() toggle = new EventEmitter<void>();
  @Output() minimize = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  onToggle() {
    this.toggle.emit();
  }

  onMinimize() {
    this.minimize.emit();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.authService.logout();
  }
}