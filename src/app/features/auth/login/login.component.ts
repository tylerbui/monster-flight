import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/flight-form']);
      }
    });
  }

  async signInWithGoogle(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      await this.authService.signInWithGoogle();
    } catch (error: any) {
      this.errorMessage = error.message || 'Login failed. Please try again.';
      console.error('Login error:', error);
    } finally {
      this.loading = false;
    }
  }
}
