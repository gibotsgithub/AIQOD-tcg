import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mas-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mas-history.html',
  styleUrls: ['./mas-history.css'],
})
export class MasHistoryComponent implements OnInit {
  resultData: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const userName = localStorage.getItem('user_name');
    // console.log(userName);
    if (userName) {
      this.http
        .get<any[]>(
          `https://tcg-node.onrender.com/api/mas-history/user/${userName}`
        )
        .subscribe({
          next: (data) => {
            this.resultData = data;
            console.log('sending data', data);
          },
          error: (err) => {
            console.error('Failed to fetch MAS history:', err);
          },
        });
    }
  }
  getTotalIssues(issueCounts: any): number {
    if (!issueCounts) return 0;
    return Object.values(issueCounts).reduce(
      (sum: number, val: any) => sum + Number(val),
      0
    );
  }
  viewDetails(tx: any) {
    console.log('view details clicked', tx);
    this.router.navigate(['/analysis-results'], {
      state: { resultData: tx, from: 'mas-history' },
    });
    //fromchatbot+data
  }

  deleteEntry(tx: any) {
    if (!tx || !tx._id) return; // Ensure the transaction has an ID

    this.http
      .delete(`https://tcg-node.onrender.com/api/mas-history/${tx._id}`)
      .subscribe({
        next: () => {
          // Remove the deleted transaction from the local array
          this.resultData = this.resultData.filter((t) => t._id !== tx._id);
          // Optionally, show a success message
          alert('Entry deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete entry:', err);
          // Optionally, show an error message
          alert('Failed to delete entry.');
        },
      });
  }
}
