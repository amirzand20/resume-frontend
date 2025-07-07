import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { HeaderComponent } from '../shared/header/header.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss'],
  standalone: true,
  imports: [StepsModule, RouterModule, HeaderComponent, CardModule]
})
export class ResumeBuilderComponent {
  steps = [
    { label: 'اطلاعات شخصی', routerLink: 'step1' },
    { label: 'اطلاعات تماس', routerLink: 'step2' },
    { label: 'تحصیلات', routerLink: 'step3' },
    { label: 'سوابق کاری', routerLink: 'step4' },
    { label: 'مهارت‌ها', routerLink: 'step5' },
    { label: 'زبان‌ها', routerLink: 'step6' },
    { label: 'وضعیت متقاضی', routerLink: 'step7' }
  ];
  activeIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    // Set activeIndex based on current route
    this.route.firstChild?.url.subscribe(url => {
      const step = url[0]?.path;
      this.activeIndex = this.steps.findIndex(s => s.routerLink === step);
    });
  }

  onStepChange(event: any) {
    const step = this.steps[event.index];
    if (step) {
      this.router.navigate([step.routerLink], { relativeTo: this.route });
    }
  }
} 