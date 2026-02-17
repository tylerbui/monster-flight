import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
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
