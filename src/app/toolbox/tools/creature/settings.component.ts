import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Size, Sizes, Token } from '@bm/models';
import { TokenDialogComponent } from '@bm/toolbox/components/token-dialog';

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
    private dialog: MatDialog,
  ) {
    settings.size$.subscribe(s => this.size = s);
    settings.token$.subscribe(t => this.token = t);
  }

  onTokenClick() {
    const config: MatDialogConfig<any> = {
      width: '1129px'
    };
    const dRef = this.dialog.open(TokenDialogComponent, config);
    dRef.afterClosed().subscribe((result: Token) => {
      if (!result) { return; }
      this.settings.setToken(result.id);
    });
  }

  onSizeChange(size: Size) { this.settings.setSize(size); }
}
