import { Directive, OnInit } from '@angular/core';
import { MapCanvas, MapController } from '@bm/map/services';
import { relativePoint } from '@bm/utils';

@Directive({
  selector: '[bmMapNavigation]',
})
export class MapNavigationDirective implements OnInit {
  private enabled: boolean;

  private panMoveBound = this.onPanMove.bind(this);
  private pinchMoveBound = this.onPinchMove.bind(this);
  private panEndBound = this.onPanEnd.bind(this);
  private pinchBound = this.onPinch.bind(this);
  private pinchEndBound = this.onPinchEnd.bind(this);
  private wheelBound = this.onWheel.bind(this);

  constructor(
    private canvas: MapCanvas,
    private controller: MapController
  ) { }

  ngOnInit() {
    this.controller.enabled$.subscribe(e => {
      this.enabled = e;
      this.enabled ? this.addEvents() : this.removeEvents();
    });
  }

  private addEvents() {
    this.canvas.hammer.on('panmove', this.panMoveBound);
    this.canvas.hammer.on('pinchmove', this.pinchMoveBound);
    this.canvas.hammer.on('panend', this.panEndBound);
    this.canvas.hammer.on('pinch', this.pinchBound);
    this.canvas.hammer.on('pinchend', this.pinchEndBound);
    this.canvas.element.addEventListener('wheel', this.wheelBound);
  }

  private removeEvents() {
    this.canvas.hammer.off('panmove', this.panMoveBound);
    this.canvas.hammer.off('pinchmove', this.pinchMoveBound);
    this.canvas.hammer.off('panend', this.panEndBound);
    this.canvas.hammer.off('pinch', this.pinchBound);
    this.canvas.hammer.off('pinchend', this.pinchEndBound);
    this.canvas.element.removeEventListener('wheel', this.wheelBound);
  }

  private onPanMove(e: any) { if (!this.enabled) { return; } this.controller.livePan({ x: e.deltaX, y: e.deltaY }); }
  private onPinchMove(e: any) { if (!this.enabled) { return; } this.controller.livePan({ x: e.deltaX, y: e.deltaY }); }
  private onPanEnd(e: any) { if (!this.enabled) { return; } this.controller.endPan(); }
  private onPinch(e: any) { if (!this.enabled) { return; } this.controller.liveZoom(e.scale); }
  private onPinchEnd(e: any) { if (!this.enabled) { return; } this.controller.zoomTo(e.scale, e.center); }
  private onWheel(e: WheelEvent) {
    if (!this.enabled) { return; }
    const origin = relativePoint({ x: e.clientX, y: e.clientY }, this.canvas.element);
    e.deltaY > 0 ? this.controller.zoomOut(origin) : this.controller.zoomIn(origin);
  }
}
