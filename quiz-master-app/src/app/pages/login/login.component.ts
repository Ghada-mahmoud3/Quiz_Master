import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LogInComponent {
  showPassword = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.auth.logout();

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: (users) => {
        if (users.length === 1) {
          const user = users[0];
          
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role);
          localStorage.setItem('email', user.email);

          if (user.role === 'teacher') {
            this.router.navigate(['/admin/dashboard']);
          } else if (user.role === 'student') {
            this.router.navigate(['/student/dashboard']);
          } else {
            alert('Role Not Found');
          }
        } else {
          console.error('Invalid credentials');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}
