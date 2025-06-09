import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
  `]
})
export class DashboardComponent {
  constructor() {}
} 