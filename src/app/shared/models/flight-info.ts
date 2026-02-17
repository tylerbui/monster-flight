export interface FlightInfoPayload {
  airline: string;
  arrivalDate: string;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments?: string;
}

export interface FlightFormData {
  airline: string;
  arrivalDate: Date;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export enum SubmissionStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
