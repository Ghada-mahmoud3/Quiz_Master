import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isMinimized: boolean = false;
  @Input() isVisible: boolean = true;

  constructor(private authService: AuthService) { }
  sidebarVisible = true;
  sidebarMinimized = false;
  isToggled = true;
  
  toggleIcon() {
    this.isToggled = !this.isToggled;
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleMinimize() {
    this.sidebarMinimized = !this.sidebarMinimized;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    this.authService.logout();
  }
}
