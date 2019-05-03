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

  canvasClick(e: MouseEvent) {
    const location = this.grid.cellFromMouse(e);
    const creature: Creature = { id: undefined, tokenId: this.settings.token, size: this.settings.size, location };
    this.battlefield.addCreature(creature);
  }

  activate() {
    this.canvas.element.addEventListener('click', this.onCanvasClick);
  }

  deactivate() {
    this.canvas.element.removeEventListener('click', this.onCanvasClick);
  }
}
