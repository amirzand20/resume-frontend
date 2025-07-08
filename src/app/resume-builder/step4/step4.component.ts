import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step4Interface } from '../../interfaces/step4.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PersianDatePickerComponent } from '../../shared/persian-date-picker/persian-date-picker.component';
import { ResumeService } from '../../services/resume.service';
import { ToastService } from '../../services/toast.service';
import { DropdownModule } from 'primeng/dropdown';
import { JOB_TYPE_OPTIONS } from '../../data/job-type-options';
import { OTHER_OPTIONS } from '../../data/other-options';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, PersianDatePickerComponent, DropdownModule]
})
export class Step4Component implements OnInit {
  step4Form!: FormGroup;
  jobTypeOptions = JOB_TYPE_OPTIONS;
  jobOrganOptions = OTHER_OPTIONS;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private resumeService: ResumeService, private toast: ToastService) {}

  ngOnInit(): void {
    this.step4Form = this.fb.group({
      personId: [null, Validators.required],
      jobTitle: ['', Validators.required],
      jobTypeId: [null, Validators.required],
      jobOrganId: [null, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      createdMethodId: [1],
      tableId: ['123e4567-e89b-12d3-a456-426614174000'],
      createdBy: ['123e4567-e89b-12d3-a456-426614174000']
    });
  }

  goToPreviousStep() {
    this.router.navigate(['../step3'], { relativeTo: this.route });
  }
  goToNextStep() {
    if (this.step4Form.invalid) {
      this.step4Form.markAllAsTouched();
      return;
    }
    this.resumeService.submitStep4(this.step4Form.value).subscribe({
      next: () => {
        this.router.navigate(['../step5'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toast.error('خطا', err?.message || 'خطا در ثبت اطلاعات');
      }
    });
  }
} 