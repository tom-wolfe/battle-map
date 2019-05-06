import { Injectable } from '@angular/core';
import { relativePoint } from '@bm/utils';

import { MapCanvas } from './canvas.service';
import { MapController } from './controller.service';
import { MapBinding } from './binding.service';
import { EventBindings } from '@bm/models';

@Injectable()
export class MapNavigator {
  private enabled: boolean;

  private readonly bindings: EventBindings = {
    hammer: {
      panmove: this.onPanMove.bind(this),
      pinchmove: this.onPinchMove.bind(this),
      panend: this.onPanEnd.bind(this),
      pinch: this.onPinch.bind(this),
      pinchend: this.onPinchEnd.bind(this),
    },
    element: {
      wheel: this.onWheel.bind(this)
    }
  };

  constructor(
    private canvas: MapCanvas,
    private controller: MapController,
    private binding: MapBinding
  ) {
    this.controller.enabled$.subscribe(e => {
      this.enabled = e;
      this.enabled ? this.addEvents() : this.removeEvents();
    });
  }

  private addEvents() {
    this.binding.bind(this.bindings);
  }

  private removeEvents() {
    this.binding.unbind(this.bindings);
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
