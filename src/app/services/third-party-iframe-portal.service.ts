import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ElementRef, ComponentRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ThirdPartyIframe } from 'third-party-iframe';
import { BehaviorSubject, combineLatest } from 'rxjs';

interface Rect {
  width: number;
  height: number;
  top: number;
  left: number;
}

@Injectable({
  providedIn: 'root',
})
export class ThirdPartyIframePortalService {
  private hostContainer: ElementRef | null = null;
  private portal: ComponentPortal<ThirdPartyIframe> | null = null;
  private portalRef: ComponentRef<ThirdPartyIframe> | null = null;
  private outlet: CdkPortalOutlet | null = null;

  private iframeContainerRectSrc = new BehaviorSubject<Rect | null>(null);
  private iframeContainerRect$ = this.iframeContainerRectSrc.asObservable();

  private showIframeSrc = new BehaviorSubject<boolean>(false);
  private showIframe$ = this.showIframeSrc.asObservable();

  private observer: ResizeObserver | null = null;

  constructor() {
    combineLatest([this.iframeContainerRect$, this.showIframe$]).subscribe(
      ([rect, show]) => {
        if (show && rect) {
          this.showHostContainer(rect);
        } else {
          this.hideHostContainer();
        }
      }
    );
  }

  private showHostContainer(rect: Rect) {
    const style = {
      display: 'block',
      position: 'absolute',
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      'z-index': 1,
    };
    Object.assign(this.hostContainer?.nativeElement.style, style);
  }

  private hideHostContainer() {
    const style = {
      display: 'none',
      width: '0',
      height: '0',
      top: '0',
      left: '0',
    };
    Object.assign(this.hostContainer?.nativeElement.style, style);
  }

  private observerIframeContainerRect(iframeContainer: ElementRef) {
    this.iframeContainerRectSrc.next(
      iframeContainer.nativeElement.getBoundingClientRect()
    );

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.iframeContainerRectSrc.next(entry.target.getBoundingClientRect());
      }
    });
    observer.observe(iframeContainer.nativeElement);
    this.observer = observer;
  }

  showIframe() {
    this.showIframeSrc.next(true);
  }

  hideIframe() {
    this.showIframeSrc.next(false);
  }

  registerHost(outlet: CdkPortalOutlet, container: ElementRef) {
    this.outlet = outlet;
    this.hostContainer = container;
  }

  attachToHost(url: SafeResourceUrl, iframeContainer: ElementRef) {
    if (!this.hostContainer || !this.outlet) {
      return;
    }

    this.observerIframeContainerRect(iframeContainer);

    this.portal = new ComponentPortal(ThirdPartyIframe);
    this.portalRef = this.outlet.attach(this.portal);
    this.portalRef.instance.src = url;
    this.showIframeSrc.next(true);
  }

  destroy() {
    // Destroy the component instance if it exists
    this.portalRef?.destroy();

    // Detach portal if still attached
    if (this.outlet?.hasAttached()) {
      this.outlet.detach();
    }

    this.observer?.disconnect();
    this.observer = null;

    this.showIframeSrc.next(false);
    this.iframeContainerRectSrc.next(null);

    // Clear references for GC
    this.portalRef = null;
    this.portal = null;
  }
}
