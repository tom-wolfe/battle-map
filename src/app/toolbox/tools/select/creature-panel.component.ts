import { Component } from '@angular/core';
import { Dialogs } from '@bm/dialogs';
import { MapBattlefield, MapTokens } from '@bm/map/services';
import { Creature, Size, Sizes, Token } from '@bm/models';

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

  constructor(
    private battlefield: MapBattlefield,
    private dialogs: Dialogs,
    private settings: SelectToolSettings,
    tokens: MapTokens
  ) {
    settings.creature$.subscribe(c => this.creature = c);
    tokens.tokens$.subscribe(t => this.tokens = t);
  }

  get token(): Token {
    return this.tokens.find(t => t.id === this.creature.tokenId);
  }

  onDeleteClick() {
    this.battlefield.removeCreature(this.creature);
    this.settings.setCreature(undefined);
  }

  onNameChange(name: string) {
    this.battlefield.setCreatureName(this.creature, name);
  }

  onTokenClick() {
    this.dialogs.tokenDialog().afterClosed().subscribe((result: Token) => {
      if (!result) { return; }
      this.battlefield.setCreatureToken(this.creature, result.id);
    });
  }

  onSizeChange(size: Size) {
    this.battlefield.setCreatureSize(this.creature, size);
  }
}
