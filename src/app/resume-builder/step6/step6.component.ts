import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step6Interface } from '../../interfaces/step6.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule]
})
export class Step6Component implements OnInit {
  step6Form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.step6Form = this.fb.group({
      personId: [null, Validators.required],
      languageId: [null, Validators.required],
      readingLevel: [null, Validators.required],
      writingLevel: [null, Validators.required],
      speakingLevel: [null, Validators.required],
      listeningLevel: [null, Validators.required],
      createdMethodId: [1],
      tableId: ['123e4567-e89b-12d3-a456-426614174000'],
      createdBy: ['123e4567-e89b-12d3-a456-426614174000']
    });
  }

  goToPreviousStep() {
    this.router.navigate(['../step5'], { relativeTo: this.route });
  }
  goToNextStep() {
    this.router.navigate(['../step7'], { relativeTo: this.route });
  }
} 