import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
  }

  openResume() {
    if (this.authService.isLoggedIn())
      this.router.navigateByUrl("/resume-builder")
    else
      this.router.navigateByUrl("/auth/login")
  }
}
