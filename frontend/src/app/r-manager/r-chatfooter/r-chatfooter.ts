import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-r-chatfooter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './r-chatfooter.html',
  styleUrl: './r-chatfooter.css',
})
export class RChatfooter implements OnDestroy {
  showFile = false;
  showChatbot = false;
  private intervalId: any;

  constructor(private router: Router) {
    this.intervalId = setInterval(() => {
      const savedValue = localStorage.getItem('showChatbot');
      this.showChatbot = savedValue === 'true';
    }, 500); // checks every 500ms
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  sendQuery() {
    this.router.navigate(['/maker-checker']);
  }
}
