import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './route-reuse.strategy';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: RouteReuseStrategy, useExisting: CustomRouteReuseStrategy },
  ],
};
