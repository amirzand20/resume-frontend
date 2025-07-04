import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-psychological-test',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    CardModule,
    ProgressBarModule,
    ButtonModule,
    RadioButtonModule
  ],
  template: `
    <div class="test-container">
      <div class="test-header">
        <h1>تست روانشناسی</h1>
        <p class="test-description">این تست به شما کمک می‌کند تا شناخت بهتری از وضعیت روانی خود داشته باشید</p>
      </div>

      <div *ngIf="!testCompleted" class="test-content">
        <p-progressBar [value]="progress" [showValue]="false"></p-progressBar>
        
        <p-card>
          <div class="question-container">
            <div class="question-number">
              سوال {{ currentQuestionIndex + 1 }} از {{ questions.length }}
            </div>
            
            <div class="question-text">
              {{ currentQuestion.question }}
            </div>

            <div class="options-container">
              <div *ngFor="let option of currentQuestion.options" 
                   class="option-item"
                   [class.selected]="selectedAnswer === option.value">
                <p-radioButton 
                  [name]="'question' + currentQuestionIndex"
                  [value]="option.value"
                  [(ngModel)]="selectedAnswer"
                  [inputId]="'option' + option.value">
                </p-radioButton>
                <label [for]="'option' + option.value" class="option-label">
                  {{ option.text }}
                </label>
              </div>
            </div>

            <div class="navigation-buttons">
              <button pButton 
                      *ngIf="currentQuestionIndex > 0"
                      label="سوال قبلی" 
                      icon="pi pi-arrow-right"
                      (click)="previousQuestion()"
                      class="p-button-secondary">
              </button>
              <button pButton 
                      label="سوال بعدی" 
                      icon="pi pi-arrow-left"
                      (click)="nextQuestion()"
                      [disabled]="!selectedAnswer"
                      class="p-button-primary">
              </button>
            </div>
          </div>
        </p-card>
      </div>

      <div *ngIf="testCompleted" class="result-container">
        <p-card>
          <div class="result-content">
            <div class="result-header">
              <i class="pi pi-check-circle result-icon"></i>
              <h2>نتیجه تست</h2>
            </div>
            
            <div class="score-container">
              <div class="score-circle">
                <span class="score-value">{{ score }}</span>
                <span class="score-max">از {{ maxScore }}</span>
              </div>
            </div>

            <div class="interpretation">
              {{ getScoreInterpretation() }}
            </div>

            <button pButton 
                    label="بازگشت به خانه" 
                    icon="pi pi-home"
                    routerLink="/home"
                    class="p-button-primary">
            </button>
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .test-container
      max-width: 800px
      margin: 2rem auto
      padding: 0 1rem

    .test-header
      text-align: center
      margin-bottom: 2rem

      h1
        color: #2c3e50
        margin-bottom: 0.5rem

    .test-description
      color: #666
      font-size: 1.1rem

    .test-content
      margin-top: 2rem

    .question-container
      padding: 1rem
      position: relative

    .question-number
      color: #666
      font-size: 0.9rem
      margin-bottom: 1rem

    .question-text
      font-size: 1.2rem
      color: #1a1a1a
      margin-bottom: 2rem
      line-height: 1.6
      padding: 1.5rem
      background-color: #f8f9fa
      border-radius: 8px
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05)

    .options-container
      display: flex
      flex-direction: column
      gap: 1rem
      margin-bottom: 2rem

    .option-item
      display: flex
      align-items: center
      padding: 1rem
      border: 2px solid #e0e0e0
      border-radius: 8px
      cursor: pointer
      transition: all 0.3s ease

      &:hover
        background-color: #e8f5e9
        border-color: #4CAF50

        .option-label
          color: #000000

      &.selected
        border-color: #4CAF50
        background-color: #e8f5e9

        .option-label
          color: #000000

    .option-label
      margin-right: 0.5rem
      cursor: pointer
      // color: #ffffff 
      font-size: 1.1rem
      font-weight: 500
      transition: color 0.3s ease

    .navigation-buttons
      display: flex
      justify-content: flex-end
      margin-top: 2rem
      gap: 1rem
      position: absolute
      bottom: 1rem
      right: 1rem

      button
        min-width: 120px

    .result-container
      margin-top: 2rem

    .result-content
      text-align: center
      color: #000000

    .result-header
      margin-bottom: 2rem
      color: #000000

      .result-icon
        font-size: 3rem
        color: #4CAF50
        margin-bottom: 1rem

      h2
        color: #000000
        font-size: 1.8rem
        font-weight: 600

    .score-container
      margin: 2rem 0
      color: #000000

    .score-circle
      width: 150px
      height: 150px
      border-radius: 50%
      background-color: #e8f5e9
      display: flex
      align-items: center
      justify-content: center
      margin: 0 auto
      color: #000000
      font-size: 2.5rem
      font-weight: bold
      border: 3px solid #4CAF50

    .score-value
      font-size: 3rem
      font-weight: bold

    .score-max
      font-size: 1rem
      opacity: 0.8

    .score-label
      color: #000000
      margin-top: 0.5rem
      font-size: 1.1rem
      font-weight: 500

    .interpretation
      font-size: 1.2rem
      line-height: 1.6
      color: #000000
      margin: 2rem 0
      padding: 1.5rem
      background-color: #f8f9fa
      border-radius: 8px
      font-weight: 500

    .traits-container
      display: grid
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
      gap: 1rem
      margin: 2rem 0

    .trait
      display: flex
      align-items: center
      padding: 1rem
      background-color: #f8f9fa
      border-radius: 8px
      color: #000000
      font-weight: 500
      border: 1px solid #e0e0e0

      .trait-icon
        color: #4CAF50
        margin-left: 0.5rem
        font-size: 1.2rem
  `]
})
export class PsychologicalTestComponent implements OnInit {
  questions = [
    {
      question: 'در مواجهه با استرس، معمولاً:',
      options: [
        { text: 'به خوبی مدیریت می‌کنم', value: '3' },
        { text: 'گاهی اوقات مشکل دارم', value: '2' },
        { text: 'اغلب دچار مشکل می‌شوم', value: '1' }
      ]
    },
    {
      question: 'در ارتباط با دیگران:',
      options: [
        { text: 'راحت ارتباط برقرار می‌کنم', value: '3' },
        { text: 'گاهی اوقات مشکل دارم', value: '2' },
        { text: 'اغلب مشکل دارم', value: '1' }
      ]
    },
    {
      question: 'در حل مشکلات:',
      options: [
        { text: 'به خوبی عمل می‌کنم', value: '3' },
        { text: 'گاهی اوقات مشکل دارم', value: '2' },
        { text: 'اغلب مشکل دارم', value: '1' }
      ]
    }
  ];

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  answers: { questionIndex: number; answer: string }[] = [];
  testCompleted = false;
  score = 0;
  maxScore = this.questions.length * 3;

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  get progress() {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  ngOnInit() {
    // Initialize the test
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      // Restore previous answer if exists
      const previousAnswer = this.answers.find(a => a.questionIndex === this.currentQuestionIndex);
      this.selectedAnswer = previousAnswer ? previousAnswer.answer : null;
    }
  }

  nextQuestion() {
    if (this.selectedAnswer) {
      // Save current answer
      const existingAnswerIndex = this.answers.findIndex(a => a.questionIndex === this.currentQuestionIndex);
      if (existingAnswerIndex !== -1) {
        this.answers[existingAnswerIndex].answer = this.selectedAnswer;
      } else {
        this.answers.push({ questionIndex: this.currentQuestionIndex, answer: this.selectedAnswer });
      }

      // Update score
      this.score = this.answers.reduce((total, answer) => total + parseInt(answer.answer), 0);

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        // Restore next answer if exists
        const nextAnswer = this.answers.find(a => a.questionIndex === this.currentQuestionIndex);
        this.selectedAnswer = nextAnswer ? nextAnswer.answer : null;
      } else {
        this.testCompleted = true;
      }
    }
  }

  getScoreInterpretation(): string {
    const percentage = (this.score / this.maxScore) * 100;
    if (percentage >= 80) {
      return 'سلامت روانی شما در وضعیت بسیار خوبی است.';
    } else if (percentage >= 60) {
      return 'سلامت روانی شما در وضعیت خوبی است، اما می‌تواند بهتر شود.';
    } else {
      return 'پیشنهاد می‌شود با یک متخصص مشورت کنید.';
    }
  }
} 