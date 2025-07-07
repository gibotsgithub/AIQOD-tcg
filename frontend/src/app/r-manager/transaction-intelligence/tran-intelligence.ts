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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://tcg-node.onrender.com/sample-data/transaction_details')
      .subscribe({
        next: (res) => {
          console.log('✅ Fetched transactions:', res);

          const docs = res.documents || [];
          this.fullTransactions = docs;

          this.transactions = docs.map((doc: any) => ({
            id: doc['Transaction ID'] ?? '—',
            customer: doc['Name'] ?? '—',
            account: doc['Client Account ID'] ?? '—',
            method: doc['Payment Method'] ?? '—',
            fraudFlag: doc['Fraud Flag'] ? '✔️' : '❌',
            amlFlag: 'None', // Placeholder or logic
            priority: doc['Amount_SGD'] > 1000000 ? 'Urgent ❌' : 'Normal ✅',
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
  }

  // Optional helper to get full doc by ID
  getFullTransactionById(txnId: string) {
    return this.fullTransactions.find(
      (doc) => doc['Transaction ID'] === txnId || doc.id === txnId
    );
  }
}
