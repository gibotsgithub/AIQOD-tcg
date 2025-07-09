import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

declare var LeaderLine: any;

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './workflow.html',
  styleUrl: './workflow.css',
})
export class Workflow implements AfterViewInit, OnDestroy {
  private lines: any[] = [];
  txnData: any;

  ngOnInit() {
    const role = localStorage.getItem('role');
  }

  goBack() {
    this.router.navigate(['/maker-checker']);
  }

  navHandler() {
    this.router.navigate(['/workflow-agent']);
  }

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.txnData = nav?.extras?.state?.['txnData'];
  }

  ngAfterViewInit() {
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

  ngOnDestroy() {
    this.lines.forEach((line) => line.remove());
    this.lines = [];
  }
}
