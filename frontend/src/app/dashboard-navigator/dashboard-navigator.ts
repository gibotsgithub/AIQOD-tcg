import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { TIntelligence } from '../r-manager/transaction-intelligence/tran-intelligence';

@Component({
  selector: 'app-dashboard-navigator',
  imports: [Dashboard, TIntelligence, CommonModule],
  templateUrl: './dashboard-navigator.html',
  styleUrl: './dashboard-navigator.css',
})
export class DashboardNavigator {
  role: string | null = localStorage.getItem('role');
}
