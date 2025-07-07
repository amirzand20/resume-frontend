import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step4Interface } from '../../interfaces/step4.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PersianDatePickerComponent } from '../../shared/persian-date-picker/persian-date-picker.component';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, PersianDatePickerComponent]
})
export class Step4Component implements OnInit {
  step4Form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

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
    this.router.navigate(['../step5'], { relativeTo: this.route });
  }
} 