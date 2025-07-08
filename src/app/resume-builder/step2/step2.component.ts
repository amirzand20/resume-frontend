import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step2Interface } from '../../interfaces/step2.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CITY_OPTIONS } from '../../data/city-options';
import { ResumeService } from '../../services/resume.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule]
})
export class Step2Component implements OnInit {
  step2Form!: FormGroup;
  cityOptions = CITY_OPTIONS;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private resumeService: ResumeService, private toast: ToastService) {}

  ngOnInit(): void {
    this.step2Form = this.fb.group({
      personId: [null, Validators.required],
      locationPlaceId: [null, Validators.required],
      locationAddress: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      telephoneNumber: [''],
      postCode: [''],
      fatherMobileNumber: [''],
      motherMobileNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      familiarMobileNumber: [''],
      createdMethodId: [1],
      tableId: ['123e4567-e89b-12d3-a456-426614174000'],
      isActive: [true],
      createdBy: ['123e4567-e89b-12d3-a456-426614174000']
    });
  }

  goToPreviousStep() {
    this.router.navigate(['../step1'], { relativeTo: this.route });
  }
  goToNextStep() {
    console.log(123);
    
    if (this.step2Form.invalid) {
      this.step2Form.markAllAsTouched();
      return;
    }
    this.resumeService.submitStep2(this.step2Form.value).subscribe({
      next: () => {
        this.router.navigate(['../step3'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toast.error('خطا', err?.message || 'خطا در ثبت اطلاعات');
      }
    });
  }
} 