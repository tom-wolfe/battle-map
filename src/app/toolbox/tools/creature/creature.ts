import { Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapGrid } from '@bm/map/services';
import { Creature } from '@bm/models';
import { Tool } from '@bm/toolbox/tools/tool';
import { relativeMouse } from '@bm/utils';

import { CreatureSettingsComponent } from './creature-settings.component';

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
    private battlefield: MapBattlefield
  ) { }

  canvasClick(e: MouseEvent) {
    const point = relativeMouse(e, this.canvas.element);
    const location = this.grid.cellAt(point);
    const creature: Creature = { tokenId: 0, location };
    this.battlefield.addCreature(creature);
  }

  activate() {
    console.log('Activate?');
    this.canvas.element.addEventListener('click', this.onCanvasClick);
  }

  deactivate() {
    this.canvas.element.removeEventListener('click', this.onCanvasClick);
  }
}
