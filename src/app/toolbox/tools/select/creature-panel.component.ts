import { Component } from '@angular/core';
import { SelectToolSettings } from './settings';
import { MapBattlefield } from '@bm/map/services';

@Component({
  selector: 'bm-creature-panel',
  templateUrl: './creature-panel.component.html',
  styleUrls: ['./creature-panel.component.scss']
})
export class CreaturePanelComponent {
  constructor(private settings: SelectToolSettings, private battlefield: MapBattlefield) { }

  onDeleteClick() {
    this.battlefield.removeCreature(this.settings.creature);
  }
}
