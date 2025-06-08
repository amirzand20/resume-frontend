import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/login', component: AuthComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
