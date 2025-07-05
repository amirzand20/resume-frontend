import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { ResumeService, Resume } from '../services/resume.service'
import { catchError, finalize } from 'rxjs/operators'
import { of } from 'rxjs'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'app-resume-show',
  templateUrl: './resume-show.component.html',
  styleUrls: ['./resume-show.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonModule, DropdownModule, FormsModule, ToastModule, ProgressSpinnerModule],
  providers: [MessageService]
})
export class ResumeShowComponent implements OnInit {
  resume: Resume | null = null
  selectedTheme: string = 'template1'
  themes = [
    { label: 'قالب 1', value: 'template1' },
    { label: 'قالب 2', value: 'template2' },
    { label: 'قالب 3', value: 'template3' },
    { label: 'قالب 4', value: 'template4' }
  ]
  window = window
  loading: boolean = true
  error: string | null = null

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private resumeService: ResumeService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    if (!id) {
      this.error = 'شناسه رزومه نامعتبر است'
      this.loading = false
      return
    }

    this.loadResume(Number(id))
  }

  loadResume(id: number) {
    this.loading = true
    this.error = null
    this.resume = null

    this.resumeService.getResumeById(id).pipe(
      catchError(error => {
        console.error('Error loading resume:', error)
        this.error = 'خطا در بارگذاری رزومه'
        this.messageService.add({
          severity: 'error',
          summary: 'خطا',
          detail: this.error
        })
        return of(null)
      }),
      finalize(() => {
        this.loading = false
      })
    ).subscribe(data => {
      if (data) {
        this.resume = data
      }
    })
  }

  onThemeChange(event: any) {
    this.selectedTheme = event.value
  }

  formatDate(date: string): string {
    try {
      return new Date(date).toLocaleDateString('fa-IR')
    } catch (error) {
      return date
    }
  }

  printResume() {
    window.print()
  }

  navigateToProfile() {
    this.router.navigate(['/profile'])
  }
} 