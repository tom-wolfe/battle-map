import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable } from '@angular/core';
import { MapBattlefield, MapBinding, MapCanvas, MapController, MapGrid } from '@bm/map/services';
import { Creature, EventBindings } from '@bm/models';
import { CreatureRenderData, RenderMiddleware } from '@bm/renderer';
import { Tool } from '@bm/toolbox/tools/tool';

import { CreaturePanelComponent } from './creature-panel.component';
import { SelectToolSettings } from './settings';

@Injectable()
export class SelectTool implements Tool {
  id = 7;
  title = 'Select Creature';
  icon = 'fa-mouse-pointer';

  private overlayRef: OverlayRef;

  private readonly bindings: EventBindings = {
    hammer: {
      tap: this.canvasClick.bind(this)
    },
    element: {
      mousedown: this.canvasMouseDown.bind(this),
      mouseup: this.canvasMouseUp.bind(this)
    }
  };

  constructor(
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private controller: MapController,
    private overlay: Overlay,
    private settings: SelectToolSettings,
    private binding: MapBinding,
    private middleware: RenderMiddleware
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

  canvasClick(e: HammerInput) {
    const cell = this.grid.cellFromHammer(e);
    const creature = this.battlefield.creatureAtCell(cell);
    this.settings.setCreature(creature);
  }

  canvasMouseDown(e: MouseEvent) {
    const cell = this.grid.cellFromMouse(e);
    const creature = this.battlefield.creatureAtCell(cell);
    if (creature) { this.controller.setEnabled(false); }
  }

  canvasMouseUp() { this.controller.setEnabled(true); }

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
    if (!this.settings.creature) { return; }
    creatures.forEach(c => {
      if (c.id === this.settings.creature.id) {
        c.selected = true;
      }
    })
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
