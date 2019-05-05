import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapController, MapGrid } from '@bm/map/services';
import { Tool } from '@bm/toolbox/tools/tool';

import { CreaturePanelComponent } from './creature-panel.component';
import { SelectToolSettings } from './settings';
import { Creature } from '@bm/models';

@Injectable()
export class SelectTool implements Tool {
  id = 7;
  title = 'Select Object';
  icon = 'fa-mouse-pointer';

  private hammer: HammerManager;
  private overlayRef: OverlayRef;

  private onCanvasMouseDown = this.canvasMouseDown.bind(this);
  private onCanvasClick = this.canvasClick.bind(this);
  private onCanvasMouseUp = this.canvasMouseUp.bind(this);

  constructor(
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private controller: MapController,
    private overlay: Overlay,
    private settings: SelectToolSettings
  ) {

    this.settings.creature$.subscribe(this.onSelectedCreatureChange.bind(this));

  }

  activate() {
    this.hammer = new Hammer(this.canvas.element);
    this.initializeOverlay();
    this.hammer.on('tap', this.onCanvasClick);
    this.canvas.element.addEventListener('mousedown', this.onCanvasMouseDown);
    this.canvas.element.addEventListener('mouseup', this.onCanvasMouseUp);
  }

  deactivate() {
    this.hammer.off('tap', this.onCanvasClick);
    this.canvas.element.removeEventListener('mousedown', this.onCanvasMouseDown);
    this.canvas.element.removeEventListener('mouseup', this.onCanvasMouseUp);
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
