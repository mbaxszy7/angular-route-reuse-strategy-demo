import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LastTaskService {
  private lastTaskIdSrc = new BehaviorSubject<number | null>(null);
  lastTaskId$ = this.lastTaskIdSrc.asObservable();

  setLast(id: number) {
    this.lastTaskIdSrc.next(id);
  }
}
