import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable } from '@angular/core';
import { MapBattlefield, MapBinding, MapCanvas, MapController, MapGrid } from '@bm/map/services';
import { Creature, EventBindings, Point } from '@bm/models';
import { CreatureRenderData, RenderMiddleware, RenderTrigger } from '@bm/renderer';
import { Tool } from '@bm/toolbox/tools/tool';

import { CreaturePanelComponent } from './creature-panel.component';
import { SelectToolSettings } from './settings';

@Injectable()
export class SelectTool implements Tool {
  id = 7;
  title = 'Select/Move Creature';
  icon = 'fa-mouse-pointer';

  creature: Creature;
  livePan: Point = { x: 0, y: 0 };

  private readonly bindings: EventBindings = {
    hammer: {
      tap: this.onCanvasClick.bind(this),
      panstart: this.onPanStart.bind(this),
      panmove: this.onPanMove.bind(this),
      panend: this.onPanEnd.bind(this)
    },
    element: {
      mousedown: this.onCanvasMouseDown.bind(this),
      mouseup: this.onCanvasMouseUp.bind(this)
    }
  };
  private overlayRef: OverlayRef;

  constructor(
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private controller: MapController,
    private overlay: Overlay,
    private settings: SelectToolSettings,
    private binding: MapBinding,
    private middleware: RenderMiddleware,
    private render: RenderTrigger
  ) {
    this.settings.creature$.subscribe(this.onSelectedCreatureChange.bind(this));
    this.middleware.creaturesMiddleware.push(this.onRenderCreatures.bind(this));
  }

  activate() {
    this.initializeOverlay();
    this.binding.bind(this.bindings);
  }

  deactivate() {
    this.binding.unbind(this.bindings);
    this.settings.setCreature(undefined);
    this.controller.setEnabled(true);
  }

  onCanvasClick(e: HammerInput) {
    const cell = this.grid.cellFromHammer(e);
    const creature = this.battlefield.creatureAtCell(cell);
    this.settings.setCreature(creature);
  }

  onCanvasMouseDown(e: MouseEvent) {
    const cell = this.grid.cellFromMouse(e);
    const creature = this.battlefield.creatureAtCell(cell);
    if (creature) { this.controller.setEnabled(false); }
  }

  onCanvasMouseUp() { this.controller.setEnabled(true); }

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

  show() {
    if (this.overlayRef.hasAttached()) { return; }
    const userProfilePortal = new ComponentPortal(CreaturePanelComponent);
    this.overlayRef.attach(userProfilePortal);
  }

  hide() {
    if (!this.overlayRef) { return; }
    this.overlayRef.detach();
  }

  onSelectedCreatureChange(c: Creature) {
    c ? this.show() : this.hide();
  }

  onRenderCreatures(creatures: CreatureRenderData[]) {
    if (this.settings.creature) {
      creatures.forEach(c => {
        if (c.id === this.settings.creature.id) {
          c.selected = true;
        }
      })
    }

    if (this.creature) {
      creatures.forEach(c => {
        if (c.id === this.creature.id) {
          c.image.x -= 10;
          c.image.y -= 10;
          c.image.width += 20;
          c.image.height += 20;

          c.image.x += this.livePan.x;
          c.image.y += this.livePan.y;
        }
      });
    }
  }

  private initializeOverlay() {
    if (this.overlayRef) { return; }
    const positionStrategy = this.overlay.position().connectedTo(
      new ElementRef(this.canvas.element),
      { originX: 'end', originY: 'top' },
      { overlayX: 'end', overlayY: 'top' }
    );
    const config: OverlayConfig = { positionStrategy, width: '300px', height: '100%' };
    this.overlayRef = this.overlay.create(config);
  }
}
