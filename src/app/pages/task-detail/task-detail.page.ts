import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThirdPartyIframe } from 'third-party-iframe';
import { ActivatedRoute } from '@angular/router';
import { LastTaskService } from '../../services/last-task.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ThirdPartyIframePortalService } from '../../services/third-party-iframe-portal.service';

@Component({
  selector: 'task-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit, AfterViewInit {
  @ViewChild('iframeContainer', { static: false })
  iframeContainer!: ElementRef<HTMLDivElement>;
  id!: number;
  loadingStatus: Record<number, boolean> = {};
  settingIds = [1, 2, 3, 4, 5, 6];
  iframeUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private thirdPartyIframePortalService: ThirdPartyIframePortalService
  ) {}

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

  ngAfterViewInit(): void {
    this.thirdPartyIframePortalService.attachToHost(
      this.iframeUrl,
      this.iframeContainer
    );
  }
}
