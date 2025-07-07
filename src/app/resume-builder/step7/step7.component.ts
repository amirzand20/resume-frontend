import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step7Interface } from '../../interfaces/step7.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OTHER_OPTIONS } from '../../data/other-options';
import { ResumeService } from '../../services/resume.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule]
})
export class Step7Component implements OnInit {
  step7Form!: FormGroup;
  applicantStatusOptions = OTHER_OPTIONS;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private resumeService: ResumeService, private toast: ToastService) {}

  ngOnInit(): void {
    this.step7Form = this.fb.group({
      personId: [null, Validators.required],
      applicantStatusId: [null, Validators.required],
      createdMethodId: [1],
      tableId: ['123e4567-e89b-12d3-a456-426614174000'],
      createdBy: ['123e4567-e89b-12d3-a456-426614174000']
    });
  }

  goToPreviousStep() {
    this.router.navigate(['../step6'], { relativeTo: this.route });
  }

  goToNextStep() {
    if (this.step7Form.invalid) {
      this.step7Form.markAllAsTouched();
      return;
    }
    this.resumeService.submitStep7(this.step7Form.value).subscribe({
      next: () => {
        this.router.navigate(['../step8'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toast.error('خطا', err?.message || 'خطا در ثبت اطلاعات');
      }
    });
  }
} 