import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { PortalModule, CdkPortalOutlet } from '@angular/cdk/portal';
import { ThirdPartyIframePortalService } from './services/third-party-iframe-portal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PortalModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  @ViewChild('portalOutlet', { read: CdkPortalOutlet, static: true })
  portalOutlet!: CdkPortalOutlet;
  @ViewChild('portalOutletContainer') portalOutletContainer!: ElementRef;
  protected title = 'angular-reuse-route-strategy';

  constructor(
    private thirdPartyIframePortalService: ThirdPartyIframePortalService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.thirdPartyIframePortalService.registerHost(
      this.portalOutlet,
      this.portalOutletContainer
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/tasks') {
          this.thirdPartyIframePortalService.hideIframe();
        } else {
          this.thirdPartyIframePortalService.showIframe();
        }
      }
    });
  }
}
