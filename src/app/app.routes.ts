import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'medidor',
    loadComponent: () =>
      import('./pages/medidor/medidor.component').then(m => m.MedidorComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
