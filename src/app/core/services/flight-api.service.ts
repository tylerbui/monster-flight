import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FlightInfoPayload, FlightFormData, ApiResponse } from '../../shared/models/flight-info';

@Injectable({
  providedIn: 'root',
})
export class FlightApiService {
  private apiUrl = environment.flightApiUrl;

  constructor(private http: HttpClient) {}

  submitFlightInfo(payload: FlightInfoPayload): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: environment.apiToken,
      candidate: environment.candidateName,
    });

    return this.http.post<ApiResponse>(this.apiUrl, payload, { headers });
  }

  // Helper method to format the payload
  formatPayload(formData: FlightFormData): FlightInfoPayload {
    return {
      airline: formData.airline,
      arrivalDate: this.formatDate(formData.arrivalDate),
      arrivalTime: formData.arrivalTime,
      flightNumber: formData.flightNumber,
      numOfGuests: Number(formData.numOfGuests),
      ...(formData.comments && { comments: formData.comments }),
    };
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
