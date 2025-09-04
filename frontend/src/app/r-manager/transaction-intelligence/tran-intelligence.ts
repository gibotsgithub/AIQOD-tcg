import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RChatfooter } from '../r-chatfooter/r-chatfooter';

@Component({
  selector: 'app-tran-intelligence',
  standalone: true,
  imports: [CommonModule, RChatfooter],
  templateUrl: './tran-intelligence.html',
  styleUrls: ['./tran-intelligence.css'],
})
export class TIntelligence implements OnInit {
  transactions: any[] = []; // For display (lightweight)
  fullTransactions: any[] = []; // For passing around full data
  rmName = localStorage.getItem('user_name') ?? '';

  rm_id = localStorage.getItem('RM_ID') ?? '';

  showChatbot = false;

  private intervalId: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(
        `https://aiqod-tcg.onrender.com/transaction-intelligence/${this.rm_id}`
      )
      .subscribe({
        next: (res) => {
          // console.log('✅ Fetched transactions:', res);

          const docs = res.documents || [];
          this.fullTransactions = docs;

          this.transactions = docs.map((doc: any) => ({
            id: doc['Transaction_ID'] ?? '—',
            customer: doc['Name'] ?? '—',
            account: doc['Client_Account_ID'] ?? '—',
            method: doc['Payment_Method'] ?? '—',
            fraudFlag: doc['Fraud_Flag'] ? '✔️' : '❌',
            amlFlag: 'None', // Placeholder or logic
            priority: doc['Priority_Level'] ?? 'Unknown',
            verification: doc['Verification_Status'] ?? 'Unknown',
            total:
              doc['Amount_SGD']?.toLocaleString('en-SG', {
                style: 'currency',
                currency: 'SGD',
              }) ?? 'SGD 0',
          }));
        },
        error: (err) => {
          console.error('❌ Failed to fetch transactions:', err);
        },
      });

    this.intervalId = setInterval(() => {
      const savedValue = localStorage.getItem('showChatbot');
      this.showChatbot = savedValue === 'true';
    }, 500);
  }

  // Optional helper to get full doc by ID
  getFullTransactionById(txnId: string) {
    return this.fullTransactions.find(
      (doc) => doc['Transaction ID'] === txnId || doc.id === txnId
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
