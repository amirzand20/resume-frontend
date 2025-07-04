import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    ToastModule
  ]
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      console.log('AuthComponent: User already logged in, redirecting to home');
      this.router.navigate(['/']);
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log('AuthComponent: Starting login process');
      const { username, password, rememberMe } = this.loginForm.value;
      this.isLoading = true;
      
      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          console.log('AuthComponent: Login successful, response:', response);
          this.authService.saveToken(response.access_token, rememberMe);
          console.log('AuthComponent: Token saved, navigating to home');
          this.isLoading = false;
          this.toastService.success('موفق', 'ورود با موفقیت انجام شد');
          this.router.navigateByUrl('/', { replaceUrl: true });
        },
        error: (error) => {
          console.error('AuthComponent: Login error:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'خطا در ورود به سیستم';
          this.toastService.error('خطا', this.errorMessage);
        }
      });
    } else {
      this.toastService.error('خطا', 'لطفا تمام فیلدها را پر کنید');
    }
  }

  forgotPassword(): void {
    const username = this.loginForm.get('username')?.value;
    if (!username) {
      this.toastService.error('خطا', 'لطفا نام کاربری خود را وارد کنید');
      return;
    }

    this.isLoading = true;
    
    this.authService.forgotPassword({ username }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastService.info('اطلاعات', 'لینک بازیابی رمز عبور به ایمیل شما ارسال شد');
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error('خطا', error.error?.message || 'خطا در ارسال لینک بازیابی رمز عبور');
      }
    });
  }
}
