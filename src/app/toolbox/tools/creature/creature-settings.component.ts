import { Component } from '@angular/core';
import { Token, Size, Sizes } from '@bm/models';

import { CreatureTool } from './creature';

@Component({
  selector: 'bm-creature-settings',
  templateUrl: './creature-settings.component.html'
})
export class CreatureSettingsComponent {
  Sizes = Sizes;

  size: Size;
  tokenId: number;
  tokens: Token[];

  constructor(private creature: CreatureTool) {
    creature.size$.subscribe(s => this.size = s);
    creature.token$.subscribe(t => this.tokenId = t);
    creature.tokens$.subscribe(t => this.tokens = t);
  }

  onTokenChange(id: string) { this.creature.setToken(Number(id)); }
  onSizeChange(size: Size) { this.creature.setSize(size); }
}
