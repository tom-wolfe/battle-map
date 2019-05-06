import { Injectable } from '@angular/core';
import { MapBinding, MapCanvas, MapController } from '@bm/map/services';
import { EventBindings } from '@bm/models';

import { Tool } from './tool';

@Injectable()
export class MoveTool implements Tool {
  id = 2;
  title = 'Move';
  icon = 'fa-shoe-prints';
  settingsComponent = undefined;

  private readonly bindings: EventBindings = {
    hammer: {
      panstart: this.onPanStart.bind(this),
      panmove: this.onPanMove.bind(this),
      panend: this.onPanEnd.bind(this)
    }
  }

  constructor(
    private canvas: MapCanvas,
    private controller: MapController,
    private binding: MapBinding
  ) { }

  activate() {
    this.binding.bind(this.bindings);
  }

  deactivate() {
    this.binding.unbind(this.bindings);
    this.controller.setEnabled(true);
  }

  onPanStart(e: HammerInput) { }
  onPanMove(e: HammerInput) { }
  onPanEnd(e: HammerInput) { }
}
