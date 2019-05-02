import { Component } from '@angular/core';
import { Token } from '@bm/models';

import { CreatureTool } from './creature';

@Component({
  selector: 'bm-creature-settings',
  templateUrl: './creature-settings.component.html'
})
export class CreatureSettingsComponent {
  activeTokenId: number;
  tokens: Token[];

  constructor(private creature: CreatureTool) {
    creature.tokens$.subscribe(t => this.tokens = t);
  }

  onTokenChange(e: Event) {
    // TODO: Make actual value.
    this.creature.setActiveToken(0);
  }
}
