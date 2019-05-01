import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { MapNavigator, MapRenderer } from '@bm/map/services';
import { relativeMouse } from '@bm/utils';
import * as Hammer from 'hammerjs';

@Directive({
  selector: '[bmMapNavigation]',
})
export class MapNavigationDirective implements OnInit {
  private el: HTMLCanvasElement;
  private hammer: Hammer.HammerManager;

  constructor(
    elRef: ElementRef<HTMLCanvasElement>,
    private navigator: MapNavigator,
    private renderer: MapRenderer
  ) {
    this.el = elRef.nativeElement;
    this.hammer = new Hammer(this.el);
    this.hammer.get('pinch').set({ enable: true });
  }

  ngOnInit() { this.onResize(); }

  @HostListener('window:resize') onResize() {
    this.el.width = this.el.parentElement.clientWidth;
    this.el.height = this.el.parentElement.clientHeight;
    this.renderer.render();
  }

  @HostListener('panmove', ['$event']) onPanMove(e: any) {
    this.navigator.livePan({ x: e.deltaX, y: e.deltaY });
  }

  @HostListener('pinchmove', ['$event']) onPinchMove(e: any) {
    this.navigator.livePan({ x: e.deltaX, y: e.deltaY });
  }

  @HostListener('panend', ['$event']) onPanEnd(e: any) {
    this.navigator.endPan();
  }

  @HostListener('pinch', ['$event']) onPinch(e: any) {
    this.navigator.liveZoom(e.scale);
  }

  @HostListener('pinchend', ['$event']) onPinchEnd(e: any) {
    this.navigator.zoomTo(e.scale, e.center);
  }

  @HostListener('wheel', ['$event']) onWheel(e: WheelEvent) {
    const origin = relativeMouse(e, this.el);
    e.deltaY > 0 ? this.navigator.zoomOut(origin) : this.navigator.zoomIn(origin);
  }
}
