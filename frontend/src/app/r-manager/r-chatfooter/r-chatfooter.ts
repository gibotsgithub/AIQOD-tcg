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
    // Try to extract a potential transaction ID (alphanumeric, optional quotes)
    const idPattern = /['"]?([A-Za-z0-9]{4,})['"]?/g; // minimum 4 chars to reduce false positives
    const messageUpper = message.toUpperCase();

    // Print all transactions for reference
    this.transactions.forEach((t, i) => {
      console.log(`${i + 1}:`, t['Transaction ID'], '|| id:', t.id);
    });

    let foundTxn = null;

    // Try matching every possible alphanumeric token as a potential txn ID
    let match;
    while ((match = idPattern.exec(message)) !== null) {
      const candidateId = match[1].toUpperCase();
      console.log('🔍 Trying candidate ID:', candidateId);

      const txn = this.transactions.find(
        (t) =>
          (t['Transaction ID'] &&
            t['Transaction ID'].toUpperCase() === candidateId) ||
          (t.id && t.id.toUpperCase() === candidateId)
      );

      if (txn) {
        foundTxn = txn;
        break; // Stop once found
      }
    }

    if (foundTxn) {
      console.log('✅ Matched Transaction:', foundTxn);
      this.router.navigate(['/maker-checker'], {
        state: { txnData: foundTxn },
      });
    } else {
      console.warn('❌ No matching transaction ID found in message:', message);
    }
  }
}
