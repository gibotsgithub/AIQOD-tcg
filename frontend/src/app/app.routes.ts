import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Shell } from './features/shell/shell';
import { MasPolicyWatch } from './features/mas-policy-watch/mas-policy-watch';
import { AnalysisResultsComponent } from './analysis-results/analysis-results';
import { Dashboard } from './dashboard/dashboard';
import { MasHistoryComponent } from './features/mas-history/mas-history';
import { DashboardNavigator } from './dashboard-navigator/dashboard-navigator';
import { WorkflowAgent } from './r-manager/workflow-agent/workflow-agent';
import { TIntelligence } from './r-manager/transaction-intelligence/tran-intelligence';
import { MakerCertification } from './r-manager/maker-certification/maker-certification';
import { AuthRoleGuard } from '../auth-role.guard';
import { Workflow } from './r-manager/workflow/workflow';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Shell,
    canActivate: [AuthRoleGuard], // only allow access inside Shell if logged in
    children: [
      {
        path: 'mas-policy-watch',
        component: MasPolicyWatch,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'RM'] },
      },
      {
        path: 'analysis-results/:id',
        component: AnalysisResultsComponent,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'RM'] },
      },
      {
        path: 'analysis-results',
        component: AnalysisResultsComponent,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'RM'] },
      },
      {
        path: 'dashboard',
        component: DashboardNavigator,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'Manager', 'RM'] },
      },
      {
        path: 'mas-history',
        component: MasHistoryComponent,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'RM'] },
      },
      {
        path: 'workflow-agent',
        component: WorkflowAgent,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'RM', 'checker'] },
      },
      {
        path: 'transaction-intelligence',
        component: TIntelligence,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'RM'] },
      },
      {
        path: 'maker-checker',
        component: MakerCertification,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'RM'] },
      },
      {
        path: 'workflow',
        component: Workflow,
        canActivate: [AuthRoleGuard],
        data: { allowedRoles: ['admin', 'checker', 'RM'] },
      },
    ],
  },
];
