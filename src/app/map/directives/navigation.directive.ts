import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { MapController, MapRenderer } from '@bm/map/services';
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
    private controller: MapController,
    private renderer: MapRenderer
  ) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    this.hammer = new Hammer(this.el);
    this.hammer.get('pinch').set({ enable: true });
    this.hammer.get('pan').set({ enable: true });
    this.onResize();
    this.controller.enabled$.subscribe(e => e ? this.addEvents() : this.removeEvents());
  }

  panMoveBound = this.onPanMove.bind(this);
  pinchMoveBound = this.onPinchMove.bind(this);
  panEndBound = this.onPanEnd.bind(this);
  pinchBound = this.onPinch.bind(this);
  pinchEndBound = this.onPinchEnd.bind(this);
  wheelBound = this.onWheel.bind(this);

  private addEvents() {
    this.hammer.on('panmove', e => this.onPanMove(e));
    this.hammer.on('pinchmove', this.pinchMoveBound);
    this.hammer.on('panend', this.panEndBound);
    this.hammer.on('pinch', this.pinchBound);
    this.hammer.on('pinchend', this.pinchEndBound);
    this.el.addEventListener('wheel', this.wheelBound);
  }

  private removeEvents() {
    this.hammer.off('panmove', this.panMoveBound);
    this.hammer.off('pinchmove', this.pinchMoveBound);
    this.hammer.off('panend', this.panEndBound);
    this.hammer.off('pinch', this.pinchBound);
    this.hammer.off('pinchend', this.pinchEndBound);
    this.el.removeEventListener('wheel', this.wheelBound);
  }

  @HostListener('window:resize') onResize() {
    this.el.width = this.el.parentElement.clientWidth;
    this.el.height = this.el.parentElement.clientHeight;
    this.renderer.render();
  }

  private onPanMove(e: any) { this.controller.livePan({ x: e.deltaX, y: e.deltaY }); }
  private onPinchMove(e: any) { this.controller.livePan({ x: e.deltaX, y: e.deltaY }); }
  private onPanEnd(e: any) { this.controller.endPan(); }
  private onPinch(e: any) { this.controller.liveZoom(e.scale); }
  private onPinchEnd(e: any) { this.controller.zoomTo(e.scale, e.center); }
  private onWheel(e: WheelEvent) {
    const origin = relativeMouse(e, this.el);
    e.deltaY > 0 ? this.controller.zoomOut(origin) : this.controller.zoomIn(origin);
  }
}
