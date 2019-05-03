import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ElementRef, Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapController, MapGrid } from '@bm/map/services';
import { Tool } from '@bm/toolbox/tools/tool';

import { CreaturePanelComponent } from './creature-panel.component';
import { SelectToolSettings } from './settings';

@Injectable()
export class SelectTool implements Tool {
  id = 7;
  title = 'Select Object';
  icon = 'fa-mouse-pointer';

  private overlayRef: OverlayRef;

  private onCanvasClick = this.canvasClick.bind(this);

  constructor(
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private controller: MapController,
    private overlay: Overlay,
    private settings: SelectToolSettings
  ) { }

  activate() {
    this.initializeOverlay();
    this.controller.setEnabled(false);
    this.canvas.element.addEventListener('click', this.onCanvasClick);
  }

  deactivate() {
    this.canvas.element.removeEventListener('click', this.onCanvasClick);
    this.controller.setEnabled(true);
  }

  canvasClick(e: MouseEvent) {
    const cell = this.grid.cellFromMouse(e);
    const creature = this.battlefield.creatureAtCell(cell);
    if (creature) {
      this.settings.setCreature(creature.id);
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    const userProfilePortal = new ComponentPortal(CreaturePanelComponent);
    this.overlayRef.attach(userProfilePortal);
  }

  hide() {
    this.overlayRef.detach();
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
