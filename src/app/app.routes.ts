// import { Routes } from '@angular/router';

// export const routes: Routes = [];
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // This redirects the empty URL (localhost:4200) directly to the login page
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];
