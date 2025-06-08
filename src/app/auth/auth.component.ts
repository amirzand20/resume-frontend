import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    ToastModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass'
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.toastService.error('خطا', 'لطفا نام کاربری و رمز عبور را وارد کنید');
      return;
    }

    this.isLoading = true;
    
    this.authService.login({
      username: this.username,
      password: this.password,
      role:"user"
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // Save token using the service
        this.authService.saveToken(response.token, this.rememberMe);
        
        this.toastService.success('موفق', 'ورود با موفقیت انجام شد');
        
        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error('خطا', error.error?.message || 'خطا در ورود به سیستم');
      }
    });
  }

  forgotPassword() {
    if (!this.username) {
      this.toastService.error('خطا', 'لطفا نام کاربری خود را وارد کنید');
      return;
    }

    this.isLoading = true;
    
    this.authService.forgotPassword({
      username: this.username
    }).subscribe({
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
