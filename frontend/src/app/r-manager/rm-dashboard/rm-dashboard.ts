import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Client {
  name: string;
  relationshipYears: number;
  accountType: string;
  sourceOfWealth: string;
  riskScore: string;
  customerRiskProfile: string;
  aum: string;
  growth: string;
  clientSat: number;
}

@Component({
  selector: 'app-rm-dashboard',
  imports: [CommonModule],
  templateUrl: './rm-dashboard.html',
  styleUrl: './rm-dashboard.css',
})
export class RmDashboard {
  rmName = localStorage.getItem('user_name');

  summaryCards = [
    {
      label: 'Total AUM',
      value: '$176.4M',
      sub: '↑ 12.4% this month',
      color: 'var(--cta-green)',
    },
    {
      label: 'Active Clients',
      value: '10',
      sub: '0 new this month',
      color: 'var(--cta-green)',
    },
    {
      label: 'Active Opps',
      value: '23',
      sub: '$45.2M Potential Value',
      color: 'var(--cta-green)',
    },
    {
      label: 'Risk Alerts',
      value: '12',
      sub: '3 Require Immediate Attention',
      color: '#dc2626',
    },
    { label: 'Client Sat', value: '4.3/5', sub: '', color: 'var(--cta-green)' },
  ];

  clients: Client[] = [
    {
      name: 'Aditya Mehta',
      relationshipYears: 4,
      accountType: 'Investment, Property Financing',
      sourceOfWealth: 'Real Estate',
      riskScore: 'Medium-High',
      customerRiskProfile: 'No Risk Flag',
      aum: '15,600,000',
      growth: '4%',
      clientSat: 4.7,
    },
    {
      name: 'Akita Kumar',
      relationshipYears: 5,
      accountType: 'Savings, Investment',
      sourceOfWealth: 'Employment Income',
      riskScore: 'Medium-Low',
      customerRiskProfile: 'No Risk Flag',
      aum: '12,300,000',
      growth: '12%',
      clientSat: 4.0,
    },
    {
      name: 'Christine Wong',
      relationshipYears: 7,
      accountType: 'Investment, Savings',
      sourceOfWealth: 'Business Ownership',
      riskScore: 'Medium',
      customerRiskProfile: 'No Risk Flag',
      aum: '12,900,000',
      growth: '9%',
      clientSat: 4.1,
    },
    {
      name: 'David Lee',
      relationshipYears: 15,
      accountType: 'Savings, Investment, Trust',
      sourceOfWealth: 'Employment, Investments',
      riskScore: 'Low',
      customerRiskProfile: 'No Risk Flag',
      aum: '12,400,000',
      growth: '7%',
      clientSat: 4.5,
    },
    {
      name: 'Grace Tan',
      relationshipYears: 6,
      accountType: 'Investment, FX Trading',
      sourceOfWealth: 'Business Ownership',
      riskScore: 'Medium',
      customerRiskProfile: 'No Risk Flag',
      aum: '25,200,000',
      growth: '12%',
      clientSat: 3.5,
    },
    {
      name: 'Ibrahim Ismail',
      relationshipYears: 9,
      accountType: 'Investment, FX Trading',
      sourceOfWealth: 'Employment Income',
      riskScore: 'Medium-High',
      customerRiskProfile: 'No Risk Flag',
      aum: '8,100,000',
      growth: '4%',
      clientSat: 3.5,
    },
    {
      name: 'Patrick Lim',
      relationshipYears: 11,
      accountType: 'Investment, Property Financing',
      sourceOfWealth: 'Employment Income',
      riskScore: 'Medium-High',
      customerRiskProfile: 'No Risk Flag',
      aum: '16,100,000',
      growth: '7%',
      clientSat: 4.6,
    },
    {
      name: 'Sophia Chan',
      relationshipYears: 8,
      accountType: 'Investment, Savings',
      sourceOfWealth: 'Business Ownership',
      riskScore: 'Medium',
      customerRiskProfile: 'No Risk Flag',
      aum: '47,000,000',
      growth: '12%',
      clientSat: 4.5,
    },
    {
      name: 'Tan Cheng Huat',
      relationshipYears: 12,
      accountType: 'Investment, FX Trading',
      sourceOfWealth: 'Business Ownership',
      riskScore: 'High',
      customerRiskProfile: 'No Risk Flag',
      aum: '12,700,000',
      growth: '28%',
      clientSat: 4.9,
    },
    {
      name: 'Toshiro Yamamoto',
      relationshipYears: 16,
      accountType: 'Investment, FX Trading',
      sourceOfWealth: 'Employment, Pension',
      riskScore: 'Low',
      customerRiskProfile: 'No Risk Flag',
      aum: '12,700,000',
      growth: '28%',
      clientSat: 4.9,
    },
  ];

  getClientSatClass(sat: number): string {
    if (sat >= 4.5) return 'client-sat-green';
    if (sat >= 4.0) return 'client-sat-yellow';
    return 'client-sat-red';
  }
  get totalAUM(): number {
    return this.clients.reduce(
      (sum, client) => sum + Number(client.aum.toString().replace(/,/g, '')),
      0
    );
  }
}
