import { Component } from '@angular/core';
import { MapTokens } from '@bm/map/services';

@Component({
  selector: 'bm-creature-settings',
  templateUrl: './creature-settings.component.html'
})
export class CreatureSettingsComponent {
  activeTokenId: number;

  constructor(public tokens: MapTokens) {
    
  }

  onTokenChange() {

  }
}
