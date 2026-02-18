import { FormBuilder, Validators } from '@angular/forms';

describe('FlightFormComponent - Form Validation', () => {
  const fb = new FormBuilder();

  function createForm() {
    return fb.group({
      airline: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      flightNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{1,4}$/i)]],
      numOfGuests: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      comments: [''],
    });
  }

  it('should be invalid when empty', () => {
    const form = createForm();
    expect(form.valid).toBe(false);
  });

  it('should be valid when all required fields are filled', () => {
    const form = createForm();
    form.patchValue({
      airline: 'Delta Air Lines',
      arrivalDate: '2026-03-15',
      arrivalTime: '14:30',
      flightNumber: 'DL1234',
      numOfGuests: 2,
    });
    expect(form.valid).toBe(true);
  });

  it('should be valid without comments', () => {
    const form = createForm();
    form.patchValue({
      airline: 'United Airlines',
      arrivalDate: '2026-04-01',
      arrivalTime: '09:00',
      flightNumber: 'UA567',
      numOfGuests: 1,
    });
    expect(form.valid).toBe(true);
    expect(form.get('comments')?.valid).toBe(true);
  });

  describe('airline', () => {
    it('should require a value', () => {
      const form = createForm();
      expect(form.get('airline')?.hasError('required')).toBe(true);
    });
  });

  describe('flightNumber', () => {
    it('should accept valid format: AA1234', () => {
      const form = createForm();
      form.get('flightNumber')?.setValue('AA1234');
      expect(form.get('flightNumber')?.valid).toBe(true);
    });

    it('should accept valid format: DL1', () => {
      const form = createForm();
      form.get('flightNumber')?.setValue('DL1');
      expect(form.get('flightNumber')?.valid).toBe(true);
    });

    it('should reject invalid format: A1234 (one letter)', () => {
      const form = createForm();
      form.get('flightNumber')?.setValue('A1234');
      expect(form.get('flightNumber')?.hasError('pattern')).toBe(true);
    });

    it('should reject invalid format: AAA1234 (three letters)', () => {
      const form = createForm();
      form.get('flightNumber')?.setValue('AAA1234');
      expect(form.get('flightNumber')?.hasError('pattern')).toBe(true);
    });

    it('should reject invalid format: AA12345 (five digits)', () => {
      const form = createForm();
      form.get('flightNumber')?.setValue('AA12345');
      expect(form.get('flightNumber')?.hasError('pattern')).toBe(true);
    });

    it('should reject empty value', () => {
      const form = createForm();
      form.get('flightNumber')?.setValue('');
      expect(form.get('flightNumber')?.hasError('required')).toBe(true);
    });
  });

  describe('numOfGuests', () => {
    it('should reject 0 guests', () => {
      const form = createForm();
      form.get('numOfGuests')?.setValue(0);
      expect(form.get('numOfGuests')?.hasError('min')).toBe(true);
    });

    it('should reject negative guests', () => {
      const form = createForm();
      form.get('numOfGuests')?.setValue(-1);
      expect(form.get('numOfGuests')?.hasError('min')).toBe(true);
    });

    it('should reject more than 100 guests', () => {
      const form = createForm();
      form.get('numOfGuests')?.setValue(101);
      expect(form.get('numOfGuests')?.hasError('max')).toBe(true);
    });

    it('should accept 1 guest', () => {
      const form = createForm();
      form.get('numOfGuests')?.setValue(1);
      expect(form.get('numOfGuests')?.valid).toBe(true);
    });

    it('should accept 100 guests', () => {
      const form = createForm();
      form.get('numOfGuests')?.setValue(100);
      expect(form.get('numOfGuests')?.valid).toBe(true);
    });
  });
});
