import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-personality-test',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h2 class="text-center mb-4">تست شخصیت شناسی</h2>
      
      <div *ngIf="!testCompleted" class="card">
        <div class="card-body">
          <h5 class="card-title">سوال {{ currentQuestionIndex + 1 }} از {{ questions.length }}</h5>
          <p class="card-text">{{ currentQuestion.question }}</p>
          
          <div class="options">
            <div *ngFor="let option of currentQuestion.options" class="form-check mb-2">
              <input class="form-check-input" type="radio" 
                     [name]="'question' + currentQuestionIndex" 
                     [id]="'option' + option.value"
                     [(ngModel)]="selectedAnswer"
                     [value]="option.value">
              <label class="form-check-label" [for]="'option' + option.value">
                {{ option.text }}
              </label>
            </div>
          </div>
          
          <button class="btn btn-primary mt-3" 
                  (click)="nextQuestion()" 
                  [disabled]="!selectedAnswer">
            {{ currentQuestionIndex === questions.length - 1 ? 'پایان تست' : 'سوال بعدی' }}
          </button>
        </div>
      </div>

      <div *ngIf="testCompleted" class="card">
        <div class="card-body text-center">
          <h3>نتیجه تست شخصیت</h3>
          <p class="personality-type">نوع شخصیت شما: {{ getPersonalityType() }}</p>
          <p class="description">{{ getPersonalityDescription() }}</p>
          <button class="btn btn-primary mt-3" routerLink="/home">بازگشت به خانه</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .options {
      margin: 20px 0;
    }
    .personality-type {
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0;
    }
    .description {
      font-size: 18px;
      line-height: 1.6;
    }
  `]
})
export class PersonalityTestComponent implements OnInit {
  questions = [
    {
      question: 'در یک مهمانی، معمولاً:',
      options: [
        { text: 'با همه صحبت می‌کنم و مرکز توجه هستم', value: 'E' },
        { text: 'با چند نفر محدود صحبت می‌کنم', value: 'I' }
      ]
    },
    {
      question: 'وقتی با مشکلی مواجه می‌شوید، ترجیح می‌دهید:',
      options: [
        { text: 'از تجربیات گذشته استفاده کنید', value: 'S' },
        { text: 'راه‌حل‌های جدید و خلاقانه پیدا کنید', value: 'N' }
      ]
    },
    {
      question: 'در تصمیم‌گیری‌های مهم:',
      options: [
        { text: 'به منطق و تحلیل تکیه می‌کنید', value: 'T' },
        { text: 'به احساسات و ارزش‌های خود توجه می‌کنید', value: 'F' }
      ]
    },
    {
      question: 'در زندگی روزمره:',
      options: [
        { text: 'برنامه‌ریزی دقیق دارید و منظم هستید', value: 'J' },
        { text: 'انعطاف‌پذیر هستید و خودجوش عمل می‌کنید', value: 'P' }
      ]
    }
  ];

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  answers: string[] = [];
  testCompleted = false;

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  ngOnInit() {
    // Initialize the test
  }

  nextQuestion() {
    if (this.selectedAnswer) {
      this.answers.push(this.selectedAnswer);
      this.selectedAnswer = null;
      
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.testCompleted = true;
      }
    }
  }

  getPersonalityType(): string {
    return this.answers.join('');
  }

  getPersonalityDescription(): string {
    const type = this.getPersonalityType();
    const descriptions: { [key: string]: string } = {
      'ESTJ': 'شما فردی منظم، عمل‌گرا و رهبر هستید. به قوانین و ساختار اهمیت می‌دهید.',
      'ISTJ': 'شما فردی دقیق، قابل اعتماد و سنتی هستید. به جزئیات توجه زیادی می‌کنید.',
      'ENTJ': 'شما فردی استراتژیک، رهبر و هدف‌گرا هستید. به دنبال بهبود و پیشرفت هستید.',
      'INTJ': 'شما فردی خلاق، مستقل و تحلیل‌گر هستید. به دنبال راه‌حل‌های نوآورانه هستید.',
      'ESTP': 'شما فردی عمل‌گرا، ماجراجو و انعطاف‌پذیر هستید. از لحظه حال لذت می‌برید.',
      'ISTP': 'شما فردی مستقل، تحلیل‌گر و عمل‌گرا هستید. به دنبال درک مکانیزم‌ها هستید.',
      'ENTP': 'شما فردی خلاق، کنجکاو و استراتژیک هستید. ایده‌های جدید را دوست دارید.',
      'INTP': 'شما فردی تحلیل‌گر، خلاق و مستقل هستید. به دنبال درک الگوها هستید.',
      'ESFJ': 'شما فردی دلسوز، اجتماعی و مسئولیت‌پذیر هستید. به نیازهای دیگران توجه می‌کنید.',
      'ISFJ': 'شما فردی وفادار، دلسوز و سنتی هستید. به حفظ هارمونی اهمیت می‌دهید.',
      'ENFJ': 'شما فردی الهام‌بخش، دلسوز و رهبر هستید. به رشد دیگران کمک می‌کنید.',
      'INFJ': 'شما فردی خلاق، ایده‌آل‌گرا و دلسوز هستید. به دنبال معنا و هدف هستید.',
      'ESFP': 'شما فردی سرگرم‌کننده، اجتماعی و خودجوش هستید. از زندگی لذت می‌برید.',
      'ISFP': 'شما فردی هنرمند، صلح‌طلب و دلسوز هستید. به زیبایی‌ها توجه می‌کنید.',
      'ENFP': 'شما فردی خلاق، مشتاق و اجتماعی هستید. به دنبال امکانات جدید هستید.',
      'INFP': 'شما فردی ایده‌آل‌گرا، خلاق و دلسوز هستید. به ارزش‌های شخصی اهمیت می‌دهید.'
    };

    return descriptions[type] || 'نوع شخصیت شما با ترکیب منحصر به فردی از ویژگی‌ها مشخص می‌شود.';
  }
} 