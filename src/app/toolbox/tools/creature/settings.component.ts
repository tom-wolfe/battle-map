import { Component } from '@angular/core';
import { Size, Sizes, Token } from '@bm/models';

import { CreatureToolSettings } from './settings';

@Component({
  selector: 'bm-creature-settings',
  templateUrl: './settings.component.html'
})
export class CreatureSettingsComponent {
  Sizes = Sizes;

  size: Size;
  tokenId: number;
  tokens: Token[];

  constructor(private settings: CreatureToolSettings) {
    settings.size$.subscribe(s => this.size = s);
    settings.tokenId$.subscribe(t => this.tokenId = t);
    settings.tokens$.subscribe(t => this.tokens = t);
  }

  onTokenChange(id: string) { this.settings.setToken(Number(id)); }
  onSizeChange(size: Size) { this.settings.setSize(size); }
}
