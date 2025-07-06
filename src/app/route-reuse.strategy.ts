import { Injectable } from '@angular/core';
import {
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot,
} from '@angular/router';

export enum StoreKey {
  TASK_LIST = 'tasks',
  TASK_DETAIL = 'taskDetail',
}
/**
 * Simple RouteReuseStrategy that caches routes for task list and each task detail page
 * so their component instances (and thus UI state) are preserved when navigating away.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedHandles = new Map<StoreKey, DetachedRouteHandle>();

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  private static getRouteKey(route: ActivatedRouteSnapshot): StoreKey | null {
    const key = route.routeConfig?.data?.['storeKey'];
    return key ?? null;
  }

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // only cache routes with data reuse: true
    return !!route.routeConfig?.data?.['reuse'];
  }

  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    if (!handle) return;
    const key = CustomRouteReuseStrategy.getRouteKey(route);
    if (!key) return;
    this.storedHandles.set(key, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = CustomRouteReuseStrategy.getRouteKey(route);
    if (!key) return false;
    return this.storedHandles.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const key = CustomRouteReuseStrategy.getRouteKey(route);
    if (!key) return null;
    return this.storedHandles.get(key) || null;
  }

  clearDetailsRoute() {
    const handler = this.storedHandles.get(StoreKey.TASK_DETAIL);
    if (!handler) return;
    const component = (handler as any).componentRef;
    if (component) {
      component.destroy();
    }
    this.storedHandles.delete(StoreKey.TASK_DETAIL);
  }
}
