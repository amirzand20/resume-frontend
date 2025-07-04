import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenuModule],
  templateUrl: "./header.component.html",
  styles: [`
    .header
      background-color: #ffffff
      box-shadow: 0 2px 4px rgba(0,0,0,0.1)
      padding: 1rem
      position: fixed
      top: 0
      left: 0
      right: 0
      z-index: 1000

    .header-content
      max-width: 1200px
      margin: 0 auto
      display: flex
      justify-content: space-between
      align-items: center

    .logo img
      height: 40px

    .auth-buttons
      display: flex
      gap: 1rem
  `]
})
export class HeaderComponent {
  constructor(private router: Router) { }

  logout() {
    // Add your logout logic here
    // For example:
    // this.authService.logout()
    this.router.navigate(['/login'])
  }
} 