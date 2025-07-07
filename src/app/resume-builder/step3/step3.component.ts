import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step3Interface } from '../../interfaces/step3.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PersianDatePickerComponent } from '../../shared/persian-date-picker/persian-date-picker.component';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, PersianDatePickerComponent]
})
export class Step3Component implements OnInit {
  step3Form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

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
    this.router.navigate(['../step4'], { relativeTo: this.route });
  }
} 