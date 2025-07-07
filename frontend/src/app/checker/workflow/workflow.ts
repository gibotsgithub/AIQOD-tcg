import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var LeaderLine: any; // <-- Add this line

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './workflow.html',
  styleUrl: './workflow.css',
})
export class Workflow implements AfterViewInit {
  ngAfterViewInit() {
    new LeaderLine(
      document.getElementById('card-2'),
      document.getElementById('card-4'),
      {
        color: '#03BCA3',
        size: 1.5,
        path: 'grid', // or 'arc'
        startSocket: 'bottom',
        startSocketGravity: [3, 0],
        endSocket: 'top',
        endSocketGravity: [0, 0], // 20% from the top of the right edge
        endPlug: 'arrow',
      }
    );
    new LeaderLine(
      document.getElementById('card-4'),
      document.getElementById('card-5'),
      {
        color: '#03BCA3',
        size: 1.5,
        path: 'grid', // or 'arc' for curved
        startSocket: 'right', // or 'right', 'left', 'top'
        endSocket: 'left', // adjust as needed
        endPlug: 'arrow',
      }
    );
    new LeaderLine(
      document.getElementById('card-5'),
      document.getElementById('card-3'),
      {
        color: '#03BCA3',
        size: 1.5,
        path: 'grid', // or 'arc' for curved
        startSocket: 'top', // or 'right', 'left', 'top'
        startSocketGravity: [50, 0],
        endSocket: 'left', // adjust as needed
        endPlug: 'arrow',
      }
    );
    new LeaderLine(
      document.getElementById('card-3'),
      document.getElementById('card-6'),
      {
        color: '#03BCA3',
        size: 1.5,
        path: 'grid', // or 'arc' for curved
        startSocket: 'bottom', // or 'right', 'left', 'top'
        startSocketGravity: [50, -1],
        endSocket: 'top', // adjust as needed
        endPlug: 'arrow',
      }
    );
    new LeaderLine(
      document.getElementById('card-6'),
      document.getElementById('card-5'),
      {
        color: '#03BCA3',
        size: 1.5,
        path: 'grid',
        startSocket: 'bottom', // or 'right', 'left', 'top'
        endSocket: 'bottom',
        endPlug: 'arrow',
      }
    );
    new LeaderLine(
      document.getElementById('card-4'),
      document.getElementById('card-2'),
      {
        color: '#03BCA3',
        size: 1.5,
        path: 'grid', // or 'arc' for curved
        startSocket: 'top', // or 'right', 'left', 'top'
        startSocketGravity: [7, 0],
        endSocket: 'left', // adjust as needed
        endPlug: 'arrow',
      }
    );
  }
}
