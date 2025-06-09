import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResumeService, Resume } from '../services/resume.service';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    HeaderComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  resumes: Resume[] = [];
  loading: boolean = true;

  constructor(
    private resumeService: ResumeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadResumes();
  }

  loadResumes() {
    this.loading = true;
    this.resumeService.getUserResumes().subscribe({
      next: (resumes) => {
        this.resumes = resumes;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: 'خطا در دریافت لیست رزومه‌ها'
        });
        this.loading = false;
      }
    });
  }

  confirmDelete(resume: Resume) {
    this.confirmationService.confirm({
      message: 'آیا از حذف این رزومه اطمینان دارید؟',
      accept: () => {
        this.deleteResume(resume.id);
      }
    });
  }

  deleteResume(id: number) {
    this.resumeService.deleteResume(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'موفق',
          detail: 'رزومه با موفقیت حذف شد'
        });
        this.loadResumes();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: 'خطا در حذف رزومه'
        });
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fa-IR');
  }
} 