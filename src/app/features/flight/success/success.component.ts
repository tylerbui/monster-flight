import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  submitAnother(): void {
    this.router.navigate(['/flight-form']);
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
  }
}
