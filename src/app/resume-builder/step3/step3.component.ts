import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step3Interface } from '../../interfaces/step3.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PersianDatePickerComponent } from '../../shared/persian-date-picker/persian-date-picker.component';
import { ResumeService } from '../../services/resume.service';
import { ToastService } from '../../services/toast.service';
import { DropdownModule } from 'primeng/dropdown';
import { RECRUITMENT_STATUS_OPTIONS } from '../../data/recruitment-status-options';
import { EMPLOYEE_TYPE_OPTIONS } from '../../data/employee-type-options';
import { OTHER_OPTIONS } from '../../data/other-options';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, PersianDatePickerComponent, DropdownModule]
})
export class Step3Component implements OnInit {
  step3Form!: FormGroup;
  recruitmentStatusOptions = RECRUITMENT_STATUS_OPTIONS;
  employeeTypeOptions = EMPLOYEE_TYPE_OPTIONS;
  employeeForceOptions = OTHER_OPTIONS;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private resumeService: ResumeService, private toast: ToastService) {}

  ngOnInit(): void {
    this.step3Form = this.fb.group({
      employeeTypeId: [null, Validators.required],
      employeeForceId: [null, Validators.required],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      recruitmentStatusId: [null, Validators.required],
      createdMethodId: [1],
      tableId: ['123e4567-e89b-12d3-a456-426614174000'],
      createdBy: ['123e4567-e89b-12d3-a456-426614174000']
    });
  }

  goToPreviousStep() {
    this.router.navigate(['../step2'], { relativeTo: this.route });
  }
  goToNextStep() {
    if (this.step3Form.invalid) {
      this.step3Form.markAllAsTouched();
      return;
    }
    this.resumeService.submitStep3(this.step3Form.value).subscribe({
      next: () => {
        this.router.navigate(['../step4'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toast.error('خطا', err?.message || 'خطا در ثبت اطلاعات');
      }
    });
  }
} 