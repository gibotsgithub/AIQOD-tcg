import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { RmDashboard } from '../r-manager/rm-dashboard/rm-dashboard';

@Component({
  selector: 'app-dashboard-navigator',
  standalone: true,
  imports: [Dashboard, RmDashboard, CommonModule],
  templateUrl: './dashboard-navigator.html',
  styleUrl: './dashboard-navigator.css',
})
export class DashboardNavigator implements OnInit, OnDestroy {
  role: string | null = localStorage.getItem('role');
  private roleCheckInterval: any;

  ngOnInit(): void {
    this.roleCheckInterval = setInterval(() => {
      const currentRole = localStorage.getItem('role');
      if (this.role !== currentRole) {
        this.role = currentRole;
      }
    }, 1000); // Check every second, tweak as needed
  }

  ngOnDestroy(): void {
    if (this.roleCheckInterval) {
      clearInterval(this.roleCheckInterval);
    }
  }
}


