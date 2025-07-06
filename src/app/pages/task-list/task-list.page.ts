import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LastTaskService } from '../../services/last-task.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { delay, Observable, of, take, tap } from 'rxjs';
import { ThirdPartyIframePortalService } from 'src/app/services/third-party-iframe-portal.service';
import { CustomRouteReuseStrategy } from 'src/app/route-reuse.strategy';

interface Task {
  id: number;
  title: string;
}

const MockTasks: Task[] = [
  { id: 1, title: 'Prepare quarterly report' },
  { id: 2, title: 'Design homepage mockups' },
  { id: 3, title: 'Fix production bugs' },
  { id: 4, title: 'Write unit tests' },
  { id: 5, title: 'Plan marketing campaign' },
];

@Component({
  selector: 'task-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  private customRouteReuseStrategy = inject(CustomRouteReuseStrategy);
  lastTaskId$!: Observable<number | null>;
  search = '';
  tasks: Task[] = [];
  isLoading = true;
  constructor(
    private router: Router,
    private lastTaskService: LastTaskService,
    private thirdPartyIframePortalService: ThirdPartyIframePortalService
  ) {
    this.lastTaskId$ = this.lastTaskService.lastTaskId$;
  }

  ngOnInit(): void {
    of(MockTasks)
      .pipe(
        tap(() => {
          this.isLoading = true;
        })
      )
      .pipe(delay(1000))
      .subscribe((tasks) => {
        this.isLoading = false;
        this.tasks = tasks;
      });
  }

  openLast() {
    let lastTaskId = null;
    this.lastTaskId$.pipe(take(1)).subscribe((id) => {
      lastTaskId = id;
    });
    if (lastTaskId !== null) {
      this.router.navigate(['/tasks', lastTaskId]);
    }
  }

  async goTo(id: number) {
    this.lastTaskService.setLast(id);
    this.customRouteReuseStrategy.clearDetailsRoute();
    this.thirdPartyIframePortalService.destroy();
    await this.router.navigate(['/tasks', id]);
  }

  get filteredTasks(): Task[] {
    const q = this.search.toLowerCase();
    return this.tasks.filter((t) => t.title.toLowerCase().includes(q));
  }
}
