import { Directive, ElementRef, OnInit } from '@angular/core';
import { MapController } from '@bm/map/services';
import { relativeMouse } from '@bm/utils';
import * as Hammer from 'hammerjs';

@Directive({
  selector: '[bmMapNavigation]',
})
export class MapNavigationDirective implements OnInit {
  private el: HTMLCanvasElement;
  private enabled: boolean;
  private hammer: Hammer.HammerManager;

  private panMoveBound = this.onPanMove.bind(this);
  private pinchMoveBound = this.onPinchMove.bind(this);
  private panEndBound = this.onPanEnd.bind(this);
  private pinchBound = this.onPinch.bind(this);
  private pinchEndBound = this.onPinchEnd.bind(this);
  private wheelBound = this.onWheel.bind(this);

  constructor(
    elRef: ElementRef<HTMLCanvasElement>,
    private controller: MapController
  ) {
    this.el = elRef.nativeElement;
  }

  ngOnInit() {
    this.hammer = new Hammer(this.el);
    this.hammer.get('pinch').set({ enable: true });
    this.controller.enabled$.subscribe(e => (this.enabled = e) ? this.addEvents() : this.removeEvents());
  }

  private addEvents() {
    this.hammer.on('panmove', this.panMoveBound);
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

  private onPanMove(e: any) { if (!this.enabled) { return; } this.controller.livePan({ x: e.deltaX, y: e.deltaY }); }
  private onPinchMove(e: any) { if (!this.enabled) { return; } this.controller.livePan({ x: e.deltaX, y: e.deltaY }); }
  private onPanEnd(e: any) { if (!this.enabled) { return; } this.controller.endPan(); }
  private onPinch(e: any) { if (!this.enabled) { return; } this.controller.liveZoom(e.scale); }
  private onPinchEnd(e: any) { if (!this.enabled) { return; } this.controller.zoomTo(e.scale, e.center); }
  private onWheel(e: WheelEvent) {
    if (!this.enabled) { return; }
    const origin = relativeMouse(e, this.el);
    e.deltaY > 0 ? this.controller.zoomOut(origin) : this.controller.zoomIn(origin);
  }
}
