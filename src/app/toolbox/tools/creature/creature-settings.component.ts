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
    creature.activeToken$.subscribe(t => this.activeTokenId = t);
    creature.tokens$.subscribe(t => this.tokens = t);
  }

  onTokenChange(id: string) {
    this.creature.setActiveToken(Number(id));
  }
}
