import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Saizen',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
  },
  {
    path: 'style-kit',
    title: 'Style kit | Saizen',
    loadComponent: () => import('./features/style-kit/style-kit').then(m => m.StyleKit),
  },
  { path: '**', redirectTo: '' },
];
