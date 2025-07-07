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
  { path: 'resume-builder', component: ResumeBuilderComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', loadComponent: () => import('./resume-builder/step1/step1.component').then(m => m.Step1Component) },
      { path: 'step2', loadComponent: () => import('./resume-builder/step2/step2.component').then(m => m.Step2Component) },
      { path: 'step3', loadComponent: () => import('./resume-builder/step3/step3.component').then(m => m.Step3Component) },
      { path: 'step4', loadComponent: () => import('./resume-builder/step4/step4.component').then(m => m.Step4Component) },
      { path: 'step5', loadComponent: () => import('./resume-builder/step5/step5.component').then(m => m.Step5Component) },
      { path: 'step6', loadComponent: () => import('./resume-builder/step6/step6.component').then(m => m.Step6Component) },
      { path: 'step7', loadComponent: () => import('./resume-builder/step7/step7.component').then(m => m.Step7Component) },
    ]
  },
  { path: 'resume/:id', component: ResumeShowComponent, canActivate: [AuthGuard] },
  { path: 'psychological-test', component: PsychologicalTestComponent, canActivate: [AuthGuard] },
  { path: 'personality-test', component: PersonalityTestComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
