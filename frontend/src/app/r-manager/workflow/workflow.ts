import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

declare var LeaderLine: any;

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './workflow.html',
  styleUrl: './workflow.css',
})
export class Workflow implements AfterViewInit, OnDestroy, AfterViewChecked {
  private lines: any[] = [];
  txnData: any;
  workflowCards: any[] = [];
  showBothSections = true;

  constructor(private router: Router, private http: HttpClient) {
    const nav = this.router.getCurrentNavigation();
    this.txnData = nav?.extras?.state?.['txnData'];
    const flag = nav?.extras?.state?.['showBothSections'];
    this.showBothSections = typeof flag === 'boolean' ? flag : true;
    console.log('showBothSections:', this.showBothSections);
  }

  ngOnInit() {
    this.http
      .get<any>('https://tcg-node.onrender.com/workflow-cards')
      .subscribe({
        next: (res) => {
          console.log('✅ Workflow Cards:', res.documents);
          this.workflowCards = res.documents;
          // Create lines after DOM update
          setTimeout(() => this.createLines(), 0);
        },
        error: (err) => {
          console.error('❌ Failed to fetch workflow cards:', err);
        },
      });
  }

  getStepsForCard(cardId: string): { key: string; value: boolean }[] {
    const card = this.workflowCards.find((c) =>
      Object.entries(c).some(
        ([k, v]) => k.trim() === 'card_id' && String(v).trim() === cardId.trim()
      )
    );

    if (!card) return [];

    return Object.entries(card)
      .filter(([key]) => key.trim() !== '_id' && key.trim() !== 'card_id')
      .map(([key, value]) => ({ key: key.trim(), value: Boolean(value) }));
  }

  goBack() {
    this.router.navigate(['/maker-checker']);
  }

  navHandler() {
    this.router.navigate(['/workflow-agent']);
  }

  createLines() {
    // Remove existing lines first
    this.lines.forEach(line => line.remove());
    this.lines = [];

    // Create LeaderLine connections between cards
    this.lines.push(
      new LeaderLine(
        document.getElementById('card-2'),
        document.getElementById('card-4'),
        {
          color: '#03BCA3',
          size: 1.5,
          path: 'grid',
          startSocket: 'bottom',
          startSocketGravity: [3, 0],
          endSocket: 'top',
          endSocketGravity: [0, 0],
          endPlug: 'arrow',
        }
      )
    );
    this.lines.push(
      new LeaderLine(
        document.getElementById('card-4'),
        document.getElementById('card-5'),
        {
          color: '#03BCA3',
          size: 1.5,
          path: 'grid',
          startSocket: 'right',
          endSocket: 'left',
          endPlug: 'arrow',
        }
      )
    );
    this.lines.push(
      new LeaderLine(
        document.getElementById('card-5'),
        document.getElementById('card-3'),
        {
          color: '#03BCA3',
          size: 1.5,
          path: 'grid',
          startSocket: 'top',
          startSocketGravity: [50, 0],
          endSocket: 'left',
          endPlug: 'arrow',
        }
      )
    );
    this.lines.push(
      new LeaderLine(
        document.getElementById('card-3'),
        document.getElementById('card-6'),
        {
          color: '#03BCA3',
          size: 1.5,
          path: 'grid',
          startSocket: 'bottom',
          startSocketGravity: [50, -1],
          endSocket: 'top',
          endPlug: 'arrow',
        }
      )
    );
    this.lines.push(
      new LeaderLine(
        document.getElementById('card-6'),
        document.getElementById('card-5'),
        {
          color: '#03BCA3',
          size: 1.5,
          path: 'grid',
          startSocket: 'bottom',
          endSocket: 'bottom',
          endPlug: 'arrow',
        }
      )
    );
    this.lines.push(
      new LeaderLine(
        document.getElementById('card-4'),
        document.getElementById('card-2'),
        {
          color: '#03BCA3',
          size: 1.5,
          path: 'grid',
          startSocket: 'top',
          startSocketGravity: [7, 0],
          endSocket: 'left',
          endPlug: 'arrow',
        }
      )
    );
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.repositionLines);
  }

  ngAfterViewChecked() {
    // Reposition lines after every view check to handle dynamic layout changes
    this.lines.forEach(line => line.position());
  }

  ngOnDestroy() {
    this.lines.forEach((line) => line.remove());
    this.lines = [];
    window.removeEventListener('resize', this.repositionLines);
  }

  repositionLines = () => {
    this.lines.forEach(line => line.position());
  };
}
