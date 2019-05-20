import { Component } from '@angular/core';
import { Dialogs } from '@bm/dialogs';
import { Size, Sizes, Token } from '@bm/models';

import { CreatureToolSettings } from './settings';

@Component({
  selector: 'bm-creature-settings',
  templateUrl: './settings.component.html'
})
export class CreatureSettingsComponent {
  Sizes = Sizes;

  size: Size;
  token: Token;

  constructor(
    private settings: CreatureToolSettings,
    private dialogs: Dialogs,
  ) {
    settings.size$.subscribe(s => this.size = s);
    settings.token$.subscribe(t => this.token = t);
  }

  onTokenClick() {
    this.dialogs.tokenDialog().afterClosed().subscribe((result: Token) => {
      if (!result) { return; }
      this.settings.setToken(result.id);
    });
  }

  onSizeChange(size: Size) { this.settings.setSize(size); }
}
