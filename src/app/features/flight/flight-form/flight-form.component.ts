import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FlightApiService } from '../../../core/services/flight-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { SubmissionStatus } from '../../../shared/models/flight-info';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss',
})
export class FlightFormComponent implements OnInit {
  flightForm!: FormGroup;
  submissionStatus = SubmissionStatus.IDLE;
  errorMessage = '';
  currentUser: any = null;

  Status = SubmissionStatus;

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
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  initializeForm(): void {
    this.flightForm = this.fb.group({
      airline: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      flightNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{1,4}$/i)]],
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
      const response = await firstValueFrom(this.flightApiService.submitFlightInfo(payload));

      this.submissionStatus = SubmissionStatus.SUCCESS;

      setTimeout(() => {
        this.router.navigate(['/success'], { state: { flight: payload } });
      }, 1500);
    } catch (error: any) {
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
    this.flightForm.reset({ numOfGuests: 1 });
    this.submissionStatus = SubmissionStatus.IDLE;
    this.errorMessage = '';
  }

  get f() {
    return this.flightForm.controls;
  }

  // Auto uppercase flight number as user types
  onFlightNumberInput(event: any): void {
    const value = event.target.value.toUpperCase();
    this.flightForm.get('flightNumber')?.setValue(value, { emitEvent: false });
  }

  // Prevent past dates
  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.flightForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.flightForm.get(fieldName);
    return !!(field && field.valid && field.touched);
  }

  private readonly fieldLabels: Record<string, string> = {
    airline: 'Airline',
    arrivalDate: 'Arrival date',
    arrivalTime: 'Arrival time',
    flightNumber: 'Flight number',
    numOfGuests: 'Number of guests',
  };

  getErrorMessage(fieldName: string): string {
    const control = this.flightForm.get(fieldName);
    const label = this.fieldLabels[fieldName] || fieldName;
    if (control?.hasError('required')) return `${label} is required`;
    if (control?.hasError('min')) return `Minimum value is ${control.errors?.['min'].min}`;
    if (control?.hasError('max')) return `Maximum value is ${control.errors?.['max'].max}`;
    if (control?.hasError('pattern')) return 'Invalid format (e.g., AA1234)';
    return '';
  }
}
