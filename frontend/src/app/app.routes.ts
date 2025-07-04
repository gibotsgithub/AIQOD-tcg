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

// Add 'export' before const routes
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
    children: [
      { path: 'mas-policy-watch', component: MasPolicyWatch },
      { path: 'analysis-results/:id', component: AnalysisResultsComponent },
      { path: 'analysis-results', component: AnalysisResultsComponent },
      { path: 'dashboard', component: DashboardNavigator },
      { path: 'mas-history', component: MasHistoryComponent },
      { path: 'workflow-agent', component: WorkflowAgent },
      { path: 'transaction-intelligence', component: TIntelligence },
      { path: 'maker-checker', component: MakerCertification },
    ],
  },
];
