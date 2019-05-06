import { Component } from '@angular/core';
import { MapBattlefield, MapTokens } from '@bm/map/services';
import { Creature, Sizes, Token, Size } from '@bm/models';

import { SelectToolSettings } from './settings';

@Component({
  selector: 'bm-creature-panel',
  templateUrl: './creature-panel.component.html',
  styleUrls: ['./creature-panel.component.scss']
})
export class CreaturePanelComponent {
  Sizes = Sizes;

  creature: Creature;
  tokens: Token[];
  
  constructor(private settings: SelectToolSettings, private battlefield: MapBattlefield, tokens: MapTokens) { 
    settings.creature$.subscribe(c => this.creature = c);
    tokens.tokens$.subscribe(t => this.tokens = t);
  }

  onDeleteClick() {
    this.battlefield.removeCreature(this.creature);
    this.settings.setCreature(undefined);
  }

  onNameChange(name: string) {
    this.battlefield.setCreatureName(this.creature, name);
  }

  onTokenChange(id: string) {
    this.battlefield.setCreatureToken(this.creature, Number(id));
  }

  onSizeChange(size: Size) {
    this.battlefield.setCreatureSize(this.creature, size);
  }
}
