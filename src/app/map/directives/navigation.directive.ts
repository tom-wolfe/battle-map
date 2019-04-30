import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { MapNavigator, MapRenderer } from '@bm/map/services';
import { Point } from '@bm/models';
import * as Hammer from 'hammerjs';

@Directive({
  selector: '[bmMapNavigation]',
})
export class MapNavigationDirective implements OnInit {
  hammer: Hammer.HammerManager;

  constructor(
    private elRef: ElementRef<HTMLCanvasElement>,
    private navigator: MapNavigator,
    private renderer: MapRenderer
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
    this.navigator.pan(this.renderer.tempPan);
    this.renderer.setTempPan({ x: 0, y: 0 });
  }

  @HostListener('pinch', ['$event']) onPinch(e: any) {
    this.renderer.setTempScale(e.scale);
  }

  @HostListener('pinchmove', ['$event']) onPinchMove(e: any) {
    this.renderer.setTempPan({ x: e.deltaX, y: e.deltaY });
  }

  @HostListener('pinchend', ['$event']) onPinchEnd(e: any) {
    this.navigator.zoom(e.scale, e.center);
    this.renderer.setTempScale(1);
  }

  @HostListener('wheel', ['$event']) onWheel(e: WheelEvent) {
    const pOffset = this.elRef.nativeElement.getBoundingClientRect();
    const origin: Point = {
      x: e.clientX - pOffset.left,
      y: e.clientY - pOffset.top
    };
    e.deltaY > 0 ? this.navigator.zoomOut(origin) : this.navigator.zoomIn(origin);
  }
}
