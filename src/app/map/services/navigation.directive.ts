import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Pan, ZoomIn, ZoomOut, Zoom } from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { Store } from '@ngrx/store';

import { Map } from './map.service';
import { MapRenderer } from './renderer.service';
import * as Hammer from 'hammerjs';
import { Point } from '@bm/models';

@Directive({
  selector: '[bmMapNavigation]',
})
export class MapNavigationDirective implements OnInit {
  hammer: Hammer.HammerManager;

  constructor(
    public elRef: ElementRef<HTMLCanvasElement>,
    public map: Map,
    private renderer: MapRenderer,
    private store: Store<AppState>
  ) {
    this.hammer = new Hammer(this.elRef.nativeElement);
    this.hammer.get('pinch').set({ enable: true });
  }

  ngOnInit() { this.onResize(); }

  @HostListener('window:resize') onResize() {
    const el = this.elRef.nativeElement;
    el.width = el.parentElement.clientWidth;
    el.height = el.parentElement.clientHeight;
    this.renderer.render();
  }

  @HostListener('panmove', ['$event']) onPanMove(e: any) {
    this.renderer.setTempPan({ x: e.deltaX, y: e.deltaY });
  }

  @HostListener('panend', ['$event']) onPanEnd(e: any) {
    this.store.dispatch(new Pan(this.renderer.tempPan));
    this.renderer.setTempPan({ x: 0, y: 0 });
  }

  @HostListener('pinch', ['$event']) onPinch(e: any) {
    this.renderer.setTempScale(e.scale);
  }

  @HostListener('pinchmove', ['$event']) onPinchMove(e: any) {
    this.renderer.setTempPan({ x: e.deltaX, y: e.deltaY });
  }

  @HostListener('pinchend', ['$event']) onPinchEnd(e: any) {
    this.store.dispatch(new Zoom(e.scale, e.center));
    this.renderer.setTempScale(1);
  }

  @HostListener('wheel', ['$event']) onWheel(e: WheelEvent) {
    const pOffset = this.elRef.nativeElement.getBoundingClientRect();
    const origin: Point = {
      x: e.clientX - pOffset.left,
      y: e.clientY - pOffset.top
    };
    this.store.dispatch(e.deltaY > 0 ? new ZoomOut(origin) : new ZoomIn(origin));
  }
}
