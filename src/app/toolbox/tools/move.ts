import { Injectable } from '@angular/core';
import { MapBattlefield, MapBinding, MapController, MapGrid } from '@bm/map/services';
import { Creature, EventBindings, Point } from '@bm/models';
import { CreatureRenderData, RenderMiddleware, RenderTrigger } from '@bm/renderer';

import { Tool } from './tool';

@Injectable()
export class MoveTool implements Tool {
  id = 2;
  title = 'Move';
  icon = 'fa-shoe-prints';
  settingsComponent = undefined;

  creature: Creature;
  livePan: Point = { x: 0, y: 0 };

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
    private binding: MapBinding,
    private middleware: RenderMiddleware,
    private render: RenderTrigger
  ) {
    this.middleware.creaturesMiddleware.push(this.onRenderCreatures.bind(this));
  }

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
    this.render.trigger();
    if (!this.creature) { return; }
    this.controller.setEnabled(false);
  }

  onPanMove(e: HammerInput) {
    if (!this.creature) { return; }
    this.livePan = { x: e.deltaX, y: e.deltaY };
    this.render.trigger();
  }
  
  onPanEnd(e: HammerInput) {
    if (!this.creature) { return; }

    const creatureOrigin = this.grid.pointFromCell(this.creature.cell);
    const newPoint: Point = {
      x: creatureOrigin.x + e.deltaX,
      y: creatureOrigin.y + e.deltaY
    };

    const cell = this.grid.nearestCell(newPoint);

    this.livePan = { x: 0, y: 0 };
    this.battlefield.moveCreature(this.creature, cell);
    this.creature = undefined;
    this.controller.setEnabled(true);
    this.render.trigger();
  }

  onRenderCreatures(creatures: CreatureRenderData[]) {
    if (!this.creature) { return; }
    creatures.forEach(c => {
      if (c.id === this.creature.id) {
        c.image.x -= 10;
        c.image.y -= 10;
        c.image.width += 20;
        c.image.height += 20;

        c.image.x += this.livePan.x;
        c.image.y += this.livePan.y;
      }
    })
  }
}
