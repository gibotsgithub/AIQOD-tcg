import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-r-chatfooter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './r-chatfooter.html',
  styleUrl: './r-chatfooter.css',
})
export class RChatfooter implements OnDestroy {
  @Input() transactions: any[] = [];

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

  sendQuery(message: string) {
    const regex =
      /initiate\s+maker\s+checker\s+for\s+['"]?\s*([A-Za-z0-9]+)\s*['"]?/i;
    const match = message.match(regex);

    if (match) {
      const txnId = match[1].trim().toUpperCase();
      console.log('🔍 Extracted TXN ID:', txnId);

      this.transactions.forEach((t, i) => {
        console.log(`${i + 1}:`, t['Transaction ID'], '|| id:', t.id);
      });

      const txn = this.transactions.find(
        (t) =>
          (t['Transaction ID'] &&
            t['Transaction ID'].toUpperCase() === txnId) ||
          (t.id && t.id.toUpperCase() === txnId)
      );

      if (txn) {
        console.log('✅ Matched Transaction:', txn);
        this.router.navigate(['/maker-checker'], { state: { txnData: txn } });
      } else {
        console.warn('❌ Transaction ID not found:', txnId);
      }
    } else {
      console.log('📝 Regular message:', message);
    }
  }
}
