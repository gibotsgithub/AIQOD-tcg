import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-workflow-agent',
  imports: [CommonModule],
  templateUrl: './workflow-agent.html',
  styleUrl: './workflow-agent.css',
})
export class WorkflowAgent {
  tabs = [
    {
      greenBar: 'Maker Agent',
      content: 'Pre-filling form fields<br><br>Validating input completeness',
    },
    {
      greenBar: 'Documentation Agent',
      content:
        'Extracting information from submitted documents<br><br>Validating information from submitted documents<br><br>Ensuring completeness of required documentation<br><br>Verifying consistency across multiple documents<br><br>Flagging discrepancies for human review',
    },
    {
      greenBar: 'Context Aware Agent',
      content:
        'Assembling Client History & Transaction Context<br><br>Comparing current transaction to typical patterns<br><br>Preparing supporting documents',
    },
    {
      greenBar: 'Pre-Check Agent',
      content:
        'Reviewing transactions<br><br>Flagging potential issues based on historical patterns<br><br>Scoring transactions by risk level for prioritized review<br><br>Preparing summary of key verification points for human checker',
    },
    {
      greenBar: 'Compliance Agent',
      content:
        'Validate Transaction against regulatory requirements<br><br>Scan for watchlist and sanctions<br><br>KYC/AML compliance<br><br>Check against internal requirements<br><br>Verify approvals based on amount thresholds',
    },
    {
      greenBar: 'Workflow Optimisation Agent',
      content:
        'Ensures activities are sequenced and queries optimized<br><br>Speeds up the process for future transaction and learns from previous transaction validation',
    },
  ];

  metrics = [
    { percent: 65, label: 'RM Time Saving' },
    { percent: 98, label: 'Auto Approval Rate' },
    { percent: 99, label: 'Compliance Accuracy' },
    { percent: 75, label: 'Processing Time Reduction' },
  ];

  ngOnInit() {
    localStorage.setItem('showChatbot', 'false');
  }
}
