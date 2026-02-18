import { FlightApiService } from './flight-api.service';

describe('FlightApiService', () => {
  let service: FlightApiService;

  beforeEach(() => {
    service = new FlightApiService(null as any);
  });

  describe('formatPayload', () => {
    it('should format all required fields correctly', () => {
      const formData = {
        airline: 'Delta Air Lines',
        arrivalDate: '2026-03-15',
        arrivalTime: '14:30',
        flightNumber: 'DL1234',
        numOfGuests: '3',
        comments: '',
      };

      const payload = service.formatPayload(formData);

      expect(payload.airline).toBe('Delta Air Lines');
      expect(payload.arrivalDate).toBe('2026-03-15');
      expect(payload.arrivalTime).toBe('14:30');
      expect(payload.flightNumber).toBe('DL1234');
      expect(payload.numOfGuests).toBe(3);
    });

    it('should convert numOfGuests string to number', () => {
      const formData = {
        airline: 'United Airlines',
        arrivalDate: '2026-04-01',
        arrivalTime: '09:00',
        flightNumber: 'UA567',
        numOfGuests: '5',
        comments: '',
      };

      const payload = service.formatPayload(formData);
      expect(typeof payload.numOfGuests).toBe('number');
      expect(payload.numOfGuests).toBe(5);
    });

    it('should include comments when provided', () => {
      const formData = {
        airline: 'American Airlines',
        arrivalDate: '2026-05-10',
        arrivalTime: '16:45',
        flightNumber: 'AA100',
        numOfGuests: '2',
        comments: 'Window seat preferred',
      };

      const payload = service.formatPayload(formData);
      expect(payload.comments).toBe('Window seat preferred');
    });

    it('should exclude comments when empty', () => {
      const formData = {
        airline: 'Southwest Airlines',
        arrivalDate: '2026-06-20',
        arrivalTime: '11:00',
        flightNumber: 'WN800',
        numOfGuests: '1',
        comments: '',
      };

      const payload = service.formatPayload(formData);
      expect(payload).not.toHaveProperty('comments');
    });

    it('should format date as ISO date string', () => {
      const formData = {
        airline: 'JetBlue Airways',
        arrivalDate: '2026-12-25',
        arrivalTime: '08:00',
        flightNumber: 'B6200',
        numOfGuests: '1',
        comments: '',
      };

      const payload = service.formatPayload(formData);
      expect(payload.arrivalDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
