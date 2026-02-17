import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'flight-form',
    loadComponent: () => import('./features/flight/flight-form/flight-form.component').then((m) => m.FlightFormComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'success',
    loadComponent: () => import('./features/flight/success/success.component').then((m) => m.SuccessComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
