import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AuthFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignUpComponent {
  showPassword = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['student', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Signup data:', this.signupForm.value);
      // Handle signup logic here
      const { email, password, name, role } = this.signupForm.value;

      this.auth.signup(email!, password!, name!, role!).subscribe({
        next: (user) => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('token', user.role);
          this.router.navigate([`/login`]);
        },
        error: (err) => {
          console.error('signup failed:', err);
        }
      });
    }
  }
}
