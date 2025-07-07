import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Step6Interface } from '../../interfaces/step6.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ResumeService } from '../../services/resume.service';
import { ToastService } from '../../services/toast.service';
import { DropdownModule } from 'primeng/dropdown';
import { LANGUAGE_OPTIONS } from '../../data/language-options';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule]
})
export class Step6Component implements OnInit {
  step6Form!: FormGroup;
  languageOptions = LANGUAGE_OPTIONS;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private resumeService: ResumeService, private toast: ToastService) {}

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
    if (this.step6Form.invalid) {
      this.step6Form.markAllAsTouched();
      return;
    }
    this.resumeService.submitStep6(this.step6Form.value).subscribe({
      next: () => {
        this.router.navigate(['../step7'], { relativeTo: this.route });
      },
      error: (err) => {
        this.toast.error('خطا', err?.message || 'خطا در ثبت اطلاعات');
      }
    });
  }
} 