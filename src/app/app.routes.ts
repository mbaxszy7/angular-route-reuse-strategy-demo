import { Routes } from '@angular/router';

import { TaskListPage } from './pages/task-list/task-list.page';
import { TaskDetailPage } from './pages/task-detail/task-detail.page';
import { IntegrationPage } from './pages/integration/integration.page';
import { StoreKey } from './route-reuse.strategy';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    component: TaskListPage,
    data: { reuse: true, storeKey: StoreKey.TASK_LIST },
  },
  {
    path: 'tasks/:id',
    component: TaskDetailPage,
    data: { reuse: true, storeKey: StoreKey.TASK_DETAIL },
  },
  { path: 'integration', component: IntegrationPage },
];
