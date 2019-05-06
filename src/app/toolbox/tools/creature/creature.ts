import { Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapGrid } from '@bm/map/services';
import { Creature } from '@bm/models';
import { Tool } from '@bm/toolbox/tools/tool';

import { CreatureToolSettings } from './settings';
import { CreatureSettingsComponent } from './settings.component';

@Injectable()
export class CreatureTool implements Tool {
  id = 1;
  title = 'Creature';
  icon = 'fa-chess-knight';
  settingsComponent = CreatureSettingsComponent;

  private onCanvasClick = this.canvasClick.bind(this);

  constructor(
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private settings: CreatureToolSettings
  ) { }

  canvasClick(e: HammerInput) {
    const cell = this.grid.cellFromHammer(e);
    const token = this.settings.token;
    const creature: Creature = { id: undefined, name: token.name, tokenId: token.id, size: this.settings.size, cell };
    this.battlefield.addCreature(creature);
  }

  activate() {
    this.canvas.hammer.on('tap', this.onCanvasClick);
  }

  deactivate() {
    this.canvas.hammer.off('tap', this.onCanvasClick);
  }
}
