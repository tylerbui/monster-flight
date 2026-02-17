import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlightFormComponent } from './flight-form/flight-form';
import { SuccessComponent } from './success/success';

const routes: Routes = [
  { path: '', component: FlightFormComponent },
  { path: 'success', component: SuccessComponent },
];

@NgModule({
  declarations: [FlightFormComponent, SuccessComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class FlightModule {}
