import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step1Interface } from '../../interfaces/step1.interface';
import { PersianDatePickerComponent } from '../../shared/persian-date-picker/persian-date-picker.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { SEX_OPTIONS } from '../../data/sex-options';
import { CITY_OPTIONS } from '../../data/city-options';
import { ResumeService } from '../../services/resume.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, FileUploadModule, DropdownModule, PersianDatePickerComponent]
})
export class Step1Component implements OnInit {
  step1Form!: FormGroup;
  sexOptions = SEX_OPTIONS;
  cityOptions = CITY_OPTIONS;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private resumeService: ResumeService, private toast: ToastService) {}

  ngOnInit(): void {
    this.step1Form = this.fb.group({
      nationalNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthPlaceId: [null, Validators.required],
      locationPlaceId: [null, Validators.required],
      sexId: [null, Validators.required],
      aboutMe: [''],
      mobileNumber: ['', Validators.required],
      telephoneNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      address: [''],
      postCode: [''],
      profileImage: ['']
    });
  }

  onFileSelect(event: any) {
    const file = event.files && event.files.length > 0 ? event.files[0] : null;
    if (file) {
      this.step1Form.get('profileImage')?.setValue(file.name);
    }
  }

  goToNextStep() {
    if (this.step1Form.invalid) {
      this.step1Form.markAllAsTouched();
      return;
    }
    this.resumeService.submitStep1(this.step1Form.value).subscribe({
      next: () => {
        this.router.navigate(['../step2'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toast.error('خطا', err?.message || 'خطا در ثبت اطلاعات');
      }
    });
  }
} 