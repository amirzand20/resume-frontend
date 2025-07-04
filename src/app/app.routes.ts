import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeShowComponent } from './resume-show/resume-show.component';
import { PsychologicalTestComponent } from './psychological-test/psychological-test.component';
import { PersonalityTestComponent } from './personality-test/personality-test.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/register', component: RegisterComponent }
    ]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'resume-builder', component: ResumeBuilderComponent, canActivate: [AuthGuard] },
  { path: 'resume/:id', component: ResumeShowComponent, canActivate: [AuthGuard] },
  { path: 'psychological-test', component: PsychologicalTestComponent, canActivate: [AuthGuard] },
  { path: 'personality-test', component: PersonalityTestComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
