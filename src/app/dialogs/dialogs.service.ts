import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { TokenDialogComponent } from './token-dialog';

@Injectable()
export class Dialogs {
  constructor(
    private dialog: MatDialog
  ) { }

  tokenDialog(): MatDialogRef<TokenDialogComponent> {
    const config: MatDialogConfig<TokenDialogComponent> = {
      width: '1129px'
    };
    return this.dialog.open(TokenDialogComponent, config);
  }
}
