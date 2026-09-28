import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PlanningComponent } from './features/planning/planning.component'; // <-- 1. Import it here

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'planning', component: PlanningComponent } // <-- 2. Add it here
    ]
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];