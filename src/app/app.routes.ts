import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'flight-form',
    loadComponent: () => import('./features/flight/flight-form/flight-form').then((m) => m.FlightFormComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'success',
    loadComponent: () => import('./features/flight/success/success').then((m) => m.SuccessComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
