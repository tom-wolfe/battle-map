import { Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapGrid } from '@bm/map/services';
import { Creature } from '@bm/models';
import { Tool } from '@bm/toolbox/tools/tool';
import Hammer from 'hammerjs';
import { CreatureToolSettings } from './settings';
import { CreatureSettingsComponent } from './settings.component';

@Injectable()
export class CreatureTool implements Tool {
  id = 1;
  title = 'Creature';
  icon = 'fa-chess-knight';
  settingsComponent = CreatureSettingsComponent;

  private hammer: HammerManager;

  private onCanvasClick = this.canvasClick.bind(this);

  constructor(
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private settings: CreatureToolSettings
  ) { }

  canvasClick(e: HammerInput) {
    const cell = this.grid.cellFromHammer(e);
    const creature: Creature = { id: undefined, tokenId: this.settings.token, size: this.settings.size, cell };
    this.battlefield.addCreature(creature);
  }

  activate() {
    this.hammer = new Hammer(this.canvas.element);
    this.hammer.on('tap', this.onCanvasClick);
  }

  deactivate() {
    this.hammer.off('tap', this.onCanvasClick);
  }
}
