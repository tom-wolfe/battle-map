import { Injectable } from '@angular/core';
import { MapBattlefield, MapBinding, MapController, MapGrid } from '@bm/map/services';
import { Creature, EventBindings } from '@bm/models';

import { Tool } from './tool';

@Injectable()
export class MoveTool implements Tool {
  id = 2;
  title = 'Move';
  icon = 'fa-shoe-prints';
  settingsComponent = undefined;

  creature: Creature;

  private readonly bindings: EventBindings = {
    hammer: {
      panstart: this.onPanStart.bind(this),
      panmove: this.onPanMove.bind(this),
      panend: this.onPanEnd.bind(this)
    }
  };

  constructor(
    private grid: MapGrid,
    private battlefield: MapBattlefield,
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

  onPanStart(e: HammerInput) {
    const cell = this.grid.cellFromHammer(e);
    this.creature = this.battlefield.creatureAtCell(cell);
    if (!this.creature) { return; }
    this.controller.setEnabled(false);
    // TODO: Set dragging creature.
  }
  onPanMove(e: HammerInput) { }
  onPanEnd(e: HammerInput) {
    if (!this.creature) { return; }
    const cell = this.grid.cellFromHammer(e);
    this.battlefield.moveCreature(this.creature, cell);
    this.creature = undefined;
    this.controller.setEnabled(true);
  }
}
