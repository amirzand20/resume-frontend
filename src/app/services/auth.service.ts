import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

interface LoginRequest {
  username: string;
  password: string;
}

interface ForgotPasswordRequest {
  username: string;
}

interface RegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface DecodedToken {
  exp: number;
  iat: number;
  sub: number;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('AuthService: Sending login request');
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, data);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      console.log('AuthService: Getting token:', token ? 'Token exists' : 'No token');
      return token;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = this.getToken();
    if (!token) {
      console.log('AuthService: No token found');
      return false;
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        console.log('AuthService: Token expired');
        this.logout();
        return false;
      }
      
      console.log('AuthService: Token valid');
      return true;
    } catch (error) {
      console.error('AuthService: Error decoding token:', error);
      this.logout();
      return false;
    }
  }

  logout(): void {
    console.log('AuthService: Logging out');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
    this.router.navigate(['/auth/login']);
  }

  saveToken(token: string, remember: boolean): void {
    console.log('AuthService: Saving token, remember:', remember);
    if (isPlatformBrowser(this.platformId)) {
      if (remember) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
    }
  }
}
