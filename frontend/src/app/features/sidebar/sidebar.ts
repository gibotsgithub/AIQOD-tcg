import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../../app/app.routes'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  showChatbot = false;
  userRole: string = '';

  ngOnInit() {
    const savedValue = localStorage.getItem('showChatbot');
    this.showChatbot = savedValue === 'true';
    this.userRole = localStorage.getItem('role') || ''; //ly true if explicitly set
  }

  allowedRolesFor(path: string): string[] {
  // Find the child route with the given path
  const shellRoute = routes.find(r => r.component?.name === 'Shell');
  if (!shellRoute || !shellRoute.children) return [];
  const child = shellRoute.children.find(c => c.path === path);
  return child?.data?.['allowedRoles'] || [];
}
canAccess(route: string): boolean {
  // Define allowed roles for each route
  const allowedRoles: { [key: string]: string[] } = {
    'dashboard': ['admin', 'Manager', 'RM'],
    'transaction-intelligence': ['admin', 'Manager', 'RM'],
    'workflow-agent': ['admin', 'Manager', 'RM'],
    'mas-policy-watch': ['admin', 'Manager', 'RM'],
    'mas-history': ['admin', 'Manager', 'RM'],
  };
  return allowedRoles[route]?.includes(this.userRole);
}
  openChatbot() {
    this.showChatbot = !this.showChatbot;
    localStorage.setItem('showChatbot', this.showChatbot.toString());
  }
}
