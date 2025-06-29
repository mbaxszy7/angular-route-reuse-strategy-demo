import { Routes } from '@angular/router';

import { TaskListPage } from './pages/task-list/task-list.page';
import { TaskDetailPage } from './pages/task-detail/task-detail.page';
import { IntegrationPage } from './pages/integration/integration.page';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListPage },
  { path: 'tasks/:id', component: TaskDetailPage },
  { path: 'integration', component: IntegrationPage }
];
