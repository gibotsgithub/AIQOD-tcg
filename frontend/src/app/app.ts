import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend';
  ngOnInit(): void {
    this.clearSession();
  }

  clearSession() {
    // localStorage.clear();
    const backup = sessionStorage.getItem('transaction_id');
    if (backup) {
      localStorage.setItem('transaction_id', backup);
      sessionStorage.clear();
    }
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  }
}
