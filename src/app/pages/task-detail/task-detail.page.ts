import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'task-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  id!: number;
  loadingStatus: Record<number, boolean> = {};
  settingIds = [1, 2, 3, 4, 5, 6];
  iframeUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.iframeUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl('/integration');

    // simulate independent slow API calls per setting
    this.settingIds.forEach((id) => {
      this.loadingStatus[id] = false;
      const delay = 600 + Math.random() * 1400; // 0.6s - 2s
      setTimeout(() => {
        this.loadingStatus[id] = true;
      }, delay);
    });
  }
}
