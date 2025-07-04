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
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  register() {
    // Validate form
    if (!this.fullName || !this.username || !this.email || !this.password || !this.confirmPassword) {
      this.toastService.error('خطا', 'لطفا تمام فیلدها را پر کنید');
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.toastService.error('خطا', 'رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }
    console.log(123);

    if (!this.acceptTerms) {
      this.toastService.error('خطا', 'لطفا قوانین و مقررات را بپذیرید');
      return;
    }

    this.isLoading = true;
    console.log("hello");
    
    this.authService.register({
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastService.success('موفق', 'ثبت نام با موفقیت انجام شد. لطفا وارد شوید.');
        
        // Redirect to login page after successful registration
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        this.toastService.error('خطا', error.error?.message || 'خطا در ثبت نام');
      }
    });
  }
}
