import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenuModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss"
})
export class HeaderComponent {
  constructor(private router: Router, public authService: AuthService) { }

  logout() {
    // Add your logout logic here
    // For example:
    // this.authService.logout()
    this.router.navigate(['/login'])
  }
} 