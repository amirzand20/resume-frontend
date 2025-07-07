import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ResumeService } from '../services/resume.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-step8',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="step8-container">
      <h2 class="success-title">رزومه با موفقیت ثبت شد!</h2>
      <div class="center-btn">
        <button pButton type="button" label="دریافت رزومه" class="p-button-success" (click)="downloadResume()"></button>
      </div>
    </div>
  `,
  styles: [`
    .step8-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60vh;
    }
    .success-title {
      margin-bottom: 2rem;
      color: #28a745;
      font-size: 1.5rem;
      text-align: center;
    }
    .center-btn {
      display: flex;
      justify-content: center;
      width: 100%;
    }
  `]
})
export class Step8Component {
  constructor(private resumeService: ResumeService, private toast: ToastService) {}

  downloadResume() {
    // Replace 1 with actual resume id as needed
    this.resumeService.reportResume(1).subscribe({
      next: (res) => {
        this.toast.success('موفق', 'رزومه با موفقیت دریافت شد!');
        // handle file download if needed
      },
      error: (err) => {
        this.toast.error('خطا', err?.message || 'خطا در دریافت رزومه');
      }
    });
  }
} 