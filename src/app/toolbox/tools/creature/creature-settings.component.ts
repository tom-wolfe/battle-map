import { Component } from '@angular/core';
import { Token } from '@bm/models';
import * as _ from 'lodash';

import { CreatureTool } from './creature';

@Component({
  selector: 'bm-creature-settings',
  templateUrl: './creature-settings.component.html'
})
export class CreatureSettingsComponent {
  activeTokenId: number;
  tokens: Token[];

  constructor(private creature: CreatureTool) {
    creature.tokens$.subscribe(t => this.tokens = _.sortBy(t, 'name'));
  }

  onTokenChange(id: string) {
    this.creature.setActiveToken(Number(id));
  }
}
