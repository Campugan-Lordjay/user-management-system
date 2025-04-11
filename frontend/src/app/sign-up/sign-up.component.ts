import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      
      const { email, password } = this.signUpForm.value;
      this.authService.signUp(email!, password!)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/verify-email']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err.error?.message || 'An error occurred during sign up';
            console.error('Sign up failed:', err);
          }
        });
    }
  }
}
