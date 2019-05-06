import { Injectable } from '@angular/core';
import { EventBindings } from '@bm/models';

import { MapCanvas } from './canvas.service';

@Injectable()
export class MapBinding {
  constructor(private canvas: MapCanvas) { }

  bind(config: EventBindings) {
    if (config.hammer) {
      Object.entries(config.hammer).forEach(([event, handler]) => this.canvas.hammer.on(event, handler));
    }
    if (config.element) {
      Object.entries(config.element).forEach(([event, handler]) => this.canvas.element.addEventListener(event, handler));
    }
  }

  unbind(config: EventBindings) {
    if (config.hammer) {
      Object.entries(config.hammer).forEach(([event, handler]) => this.canvas.hammer.off(event, handler));
    }
    if (config.element) {
      Object.entries(config).forEach(([event, handler]) => this.canvas.element.removeEventListener(event, handler));
    }
  }
}
