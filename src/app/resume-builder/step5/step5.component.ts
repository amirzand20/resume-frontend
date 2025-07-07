import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step5Interface } from '../../interfaces/step5.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule]
})
export class Step5Component implements OnInit {
  step5Form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.step5Form = this.fb.group({
      personId: [null, Validators.required],
      skillTypeId: [null, Validators.required],
      skillLevel: [null, Validators.required],
      createdMethodId: [1],
      tableId: ['123e4567-e89b-12d3-a456-426614174000'],
      createdBy: ['123e4567-e89b-12d3-a456-426614174000']
    });
  }

  goToPreviousStep() {
    this.router.navigate(['../step4'], { relativeTo: this.route });
  }
  goToNextStep() {
    this.router.navigate(['../step6'], { relativeTo: this.route });
  }
} 