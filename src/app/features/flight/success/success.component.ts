import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FlightInfoPayload } from '../../../shared/models/flight-info';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  flight: FlightInfoPayload | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.flight = nav?.extras?.state?.['flight'] || null;
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  submitAnother(): void {
    this.router.navigate(['/flight-form']);
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
  }
}
