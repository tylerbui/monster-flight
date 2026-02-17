import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightApiService } from '../../../core/services/flight-api';
import { AuthService } from '../../../core/services/auth';
import { SubmissionStatus } from '../../../shared/models/flight-info';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent implements OnInit {
  flightForm!: FormGroup;
  submissionStatus = SubmissionStatus.IDLE;
  errorMessage = '';
  currentUser: any = null;

  // Expose enum to template
  Status = SubmissionStatus;

  // Popular airlines for dropdown
  airlines = [
    'American Airlines',
    'Delta Air Lines',
    'United Airlines',
    'Southwest Airlines',
    'JetBlue Airways',
    'Alaska Airlines',
    'Spirit Airlines',
    'Frontier Airlines',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private flightApiService: FlightApiService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Get current user info
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  initializeForm(): void {
    this.flightForm = this.fb.group({
      airline: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      flightNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}\d{1,4}$/i), // AA1234 format
        ],
      ],
      numOfGuests: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      comments: [''],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.flightForm.invalid) {
      this.markFormGroupTouched(this.flightForm);
      return;
    }

    this.submissionStatus = SubmissionStatus.LOADING;
    this.errorMessage = '';

    try {
      const payload = this.flightApiService.formatPayload(this.flightForm.value);

      const response = await this.flightApiService.submitFlightInfo(payload).toPromise();

      console.log('Submission successful:', response);
      this.submissionStatus = SubmissionStatus.SUCCESS;

      // Navigate to success page after short delay
      setTimeout(() => {
        this.router.navigate(['/success']);
      }, 1500);
    } catch (error: any) {
      console.error('Submission error:', error);
      this.submissionStatus = SubmissionStatus.ERROR;
      this.errorMessage =
        error.error?.message || 'Failed to submit flight information. Please try again.';
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
  }

  resetForm(): void {
    this.flightForm.reset({
      numOfGuests: 1,
    });
    this.submissionStatus = SubmissionStatus.IDLE;
    this.errorMessage = '';
  }

  // Getter helpers for template
  get f() {
    return this.flightForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.flightForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.flightForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (control?.hasError('min')) {
      return `Minimum value is ${control.errors?.['min'].min}`;
    }
    if (control?.hasError('max')) {
      return `Maximum value is ${control.errors?.['max'].max}`;
    }
    if (control?.hasError('pattern')) {
      return 'Invalid format (e.g., AA1234)';
    }

    return '';
  }
}
