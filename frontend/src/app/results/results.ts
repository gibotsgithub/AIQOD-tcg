import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results implements OnInit {
  @Input() resultData: any;
  selectedIssue: any = null;
  nonComplianceIssues: any[] = [];

  ngOnInit(): void {
    const tableData = this.resultData?.non_compliance_table ?? [];

    console.log(tableData);

    this.nonComplianceIssues = tableData.map((item: any) => {
      const page = item.page_number ?? '—';
      const regulation = item.regulation ?? '—';
      const refDoc = item.reference_document ?? regulation;

      return {
        page,
        severity: item.severity_level ?? '—',
        regulation,
        confidence: item.confidence_percentage ?? '—',
        pageSection: `Page ${page}`,
        regulatoryRef: refDoc,
        nonCompliantText: item.non_compliant_text || '—',
        explanation: item.explanation || '—',
        remediation: item.remedy_recommendation || '—',
      };
    });
  }

  selectIssue(issue: any) {
    this.selectedIssue = issue;
  }
}
