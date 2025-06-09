import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextarea } from 'primeng/inputtextarea'
import { CalendarModule } from 'primeng/calendar'
import { DropdownModule } from 'primeng/dropdown'
import { InputNumberModule } from 'primeng/inputnumber'
import { ToastModule } from 'primeng/toast'
import { StepsModule } from 'primeng/steps'
import { MessageService } from 'primeng/api'
import { HeaderComponent } from '../shared/header/header.component'
import { registerLocaleData } from '@angular/common'
import localeFa from '@angular/common/locales/fa'
import { Calendar } from 'primeng/calendar'
import { ResumeService } from '../services/resume.service'

registerLocaleData(localeFa, 'fa')

interface StepItem {
  label: string
  command: () => void
}

interface Education {
  degree: string
  field: string
  university: string
  gpa: number
  startDate: Date
  endDate: Date
  description: string
}

interface Experience {
  title: string
  company: string
  startDate: Date
  endDate: Date
  description: string
}

interface Skill {
  name: string
  level: string
}

type ToastSeverity = 'success' | 'error' | 'info' | 'warn'

interface ToastMessage {
  severity: ToastSeverity
  summary: string
  detail: string
}

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextarea,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    ToastModule,
    StepsModule,
    HeaderComponent
  ],
  providers: [MessageService]
})
export class ResumeBuilderComponent implements OnInit {
  resumeForm: FormGroup
  currentStep = 0
  steps: StepItem[] = [
    { label: 'اطلاعات شخصی', command: () => this.currentStep = 0 },
    { label: 'اطلاعات تحصیلی', command: () => this.currentStep = 1 },
    { label: 'سوابق کاری', command: () => this.currentStep = 2 },
    { label: 'مهارت‌ها', command: () => this.currentStep = 3 },
    { label: 'زبان‌ها', command: () => this.currentStep = 4 },
    { label: 'دوره‌های آموزشی', command: () => this.currentStep = 5 },
    { label: 'افتخارات', command: () => this.currentStep = 6 },
    { label: 'تکمیل', command: () => this.currentStep = 7 }
  ]

  educationLevels = [
    { label: 'کاردانی', value: 'associate' },
    { label: 'کارشناسی', value: 'bachelor' },
    { label: 'کارشناسی ارشد', value: 'master' },
    { label: 'دکتری', value: 'phd' }
  ]

  skillLevels = [
    { label: 'مبتدی', value: 'beginner' },
    { label: 'متوسط', value: 'intermediate' },
    { label: 'پیشرفته', value: 'advanced' },
    { label: 'حرفه‌ای', value: 'expert' }
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private resumeService: ResumeService
  ) {
    this.resumeForm = this.fb.group({
      // اطلاعات شخصی
      nationalId: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      fatherName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      birthDate: [null, Validators.required],
      birthCity: ['', Validators.required],
      currentCity: ['', Validators.required],
      profileImage: [null],
      phone: ['', [Validators.required, Validators.pattern(/^09[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],

      // اطلاعات تحصیلی
      education: this.fb.array([]),

      // مهارت‌ها
      skills: this.fb.array([])
    })
  }

  ngOnInit() {
    this.addEducation()
  }

  get educationFormArray() {
    return this.resumeForm.get('education') as FormArray
  }

  get skillsFormArray() {
    return this.resumeForm.get('skills') as FormArray
  }

  addEducation() {
    const educationForm = this.fb.group({
      degree: ['', Validators.required],
      field: ['', Validators.required],
      university: ['', Validators.required],
      gpa: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      description: ['']
    })

    this.educationFormArray.push(educationForm)
  }

  removeEducation(index: number) {
    this.educationFormArray.removeAt(index)
  }

  addSkill() {
    const skillForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    })

    this.skillsFormArray.push(skillForm)
  }

  removeSkill(index: number) {
    this.skillsFormArray.removeAt(index)
  }

  showToast(severity: 'success' | 'error' | 'info' | 'warn', summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000,
      closable: true
    })
  }

  validateCurrentStep(): boolean {
    let isValid = true
    const controls = this.getCurrentStepControls()

    controls.forEach(control => {
      if (control.invalid) {
        control.markAsTouched()
        isValid = false
      }
    })

    if (!isValid) {
      this.showToast('error', 'خطا', 'لطفاً تمام فیلدهای الزامی را پر کنید')
      return false
    }

    return true
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep === 0) {
        // Get the personal information data
        const personalInfo = {
          nationalId: this.resumeForm.get('nationalId')?.value,
          firstName: this.resumeForm.get('firstName')?.value,
          lastName: this.resumeForm.get('lastName')?.value,
          fatherName: this.resumeForm.get('fatherName')?.value,
          birthDate: this.resumeForm.get('birthDate')?.value,
          birthCity: this.resumeForm.get('birthCity')?.value,
          currentCity: this.resumeForm.get('currentCity')?.value,
          phone: this.resumeForm.get('phone')?.value,
          email: this.resumeForm.get('email')?.value,
          address: this.resumeForm.get('address')?.value
        };

        // Call the API
        this.resumeService.submitStep1(personalInfo).subscribe({
          next: () => {
            this.currentStep++;
            this.showToast('success', 'موفق', 'اطلاعات با موفقیت ذخیره شد');
          },
          error: (error) => {
            this.showToast('error', 'خطا', 'خطا در ذخیره اطلاعات');
            console.error('Error submitting step 1:', error);
          }
        });
      } else {
        this.currentStep++;
        this.showToast('info', 'مرحله بعدی', `شما در حال حاضر در مرحله ${this.currentStep + 1} از 8 هستید`);
      }
    }
  }

  prevStep() {
    this.currentStep--
    this.showToast('info', 'مرحله قبلی', `شما در حال حاضر در مرحله ${this.currentStep + 1} از 8 هستید`)
  }

  getCurrentStepControls() {
    switch (this.currentStep) {
      case 0:
        return [
          this.resumeForm.get('nationalId'),
          this.resumeForm.get('firstName'),
          this.resumeForm.get('lastName'),
          this.resumeForm.get('fatherName'),
          this.resumeForm.get('birthDate'),
          this.resumeForm.get('birthCity'),
          this.resumeForm.get('currentCity'),
          this.resumeForm.get('phone'),
          this.resumeForm.get('email'),
          this.resumeForm.get('address')
        ].filter(control => control !== null) as any[]
      case 1:
        return this.educationFormArray.controls
      case 2:
        return this.skillsFormArray.controls
      default:
        return []
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        this.showToast('error', 'خطا', 'لطفاً فقط فایل تصویر انتخاب کنید')
        return
      }

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.showToast('error', 'خطا', 'حجم فایل نباید بیشتر از ۲ مگابایت باشد')
        return
      }

      // Update form
      this.resumeForm.patchValue({
        profileImage: file
      })

      this.showToast('success', 'موفق', 'تصویر با موفقیت انتخاب شد')
    }
  }

  onSubmit() {
    if (this.resumeForm.valid) {
      // TODO: Implement resume submission logic
      this.showToast('success', 'موفق', 'رزومه با موفقیت ذخیره شد')
      this.router.navigate(['/profile'])
    } else {
      this.showToast('error', 'خطا', 'لطفاً تمام فیلدهای الزامی را پر کنید')
    }
  }

  navigateToProfile() {
    this.router.navigate(['/profile'])
  }

  // Update calendar configuration
  calendarConfig = {
    locale: {
      firstDayOfWeek: 6,
      dayNames: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
      dayNamesShort: ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جم', 'شن'],
      dayNamesMin: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
      monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      monthNamesShort: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      today: 'امروز',
      clear: 'پاک کردن',
      dateFormat: 'yy/mm/dd',
      weekHeader: 'هفته'
    },
    dateFormat: 'yy/mm/dd',
    showIcon: true,
    showButtonBar: true,
    firstDayOfWeek: 6,
    showWeek: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    yearRange: '1300:1400'
  }
} 