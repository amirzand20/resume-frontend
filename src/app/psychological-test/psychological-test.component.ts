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
  templateUrl: "./psychological-test.component.html",
  styleUrl: "./psychological-test.component.scss"
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