import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'third-party-iframe',
  imports: [CommonModule],
  template: `
    <iframe [style.width]="width" [style.height]="height" [src]="src"></iframe>
  `,
  styles: ``,
})
export class ThirdPartyIframe {
  @Input() src: SafeResourceUrl | string = '';
  @Input() width = '100%';
  @Input() height = '100%';
}
