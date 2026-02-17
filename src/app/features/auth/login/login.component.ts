import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  // Toggle between login and register
  isLoginMode = true;
  loading = false;
  errorMessage = '';

  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Already logged in? redirect
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/flight-form']);
      }
    });

    this.initForm();
  }

  initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.authForm.reset();
  }

  async onSubmit(): Promise<void> {
    if (this.authForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.authForm.value;

    try {
      if (this.isLoginMode) {
        await this.authService.signInWithEmail(email, password);
      } else {
        await this.authService.registerWithEmail(email, password);
      }
    } catch (error: any) {
      this.errorMessage = this.getFirebaseError(error.code);
    } finally {
      this.loading = false;
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.authService.signInWithGoogle();
    } catch (error: any) {
      this.errorMessage = this.getFirebaseError(error.code);
    } finally {
      this.loading = false;
    }
  }

  // Convert Firebase error codes to readable messages
  getFirebaseError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Sign in was cancelled.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
