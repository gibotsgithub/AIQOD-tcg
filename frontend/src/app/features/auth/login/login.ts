import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  showPassword = false;

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}
  clearSession() {
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  }
  ngOnInit(): void {
    this.clearSession();
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      this.router.navigate(['/mas-policy-watch']);
    }
  }

  login() {
    const loginData = {
      user_name: this.username,
      password: this.password,
    };

    // console.log(loginData);

    this.http
      .post<any>('https://tcg-node.onrender.com/api/users/login', loginData)
      .subscribe({
        next: (res) => {
          // console.log('logged in', res.user.role);

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user_name', res.user.user_name);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('RM_ID', res.user.RM_ID ?? '');
          // console.log(res.user);

          // console.log(res.user.RM_ID);
          if (res.user.role === 'checker') {
            this.router.navigate(['workflow']);
          } else this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Login failed. Try again.';
        },
      });
  }
}
