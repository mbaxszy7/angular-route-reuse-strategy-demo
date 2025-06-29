import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
}

@Component({
  selector: 'task-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss']
})
export class TaskListPage {
  constructor(private router: Router) {}
  search = '';

  tasks: Task[] = [
    { id: 1, title: 'Prepare quarterly report' },
    { id: 2, title: 'Design homepage mockups' },
    { id: 3, title: 'Fix production bugs' },
    { id: 4, title: 'Write unit tests' },
    { id: 5, title: 'Plan marketing campaign' }
  ];

  goTo(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  get filteredTasks(): Task[] {
    const q = this.search.toLowerCase();
    return this.tasks.filter(t => t.title.toLowerCase().includes(q));
  }
}
