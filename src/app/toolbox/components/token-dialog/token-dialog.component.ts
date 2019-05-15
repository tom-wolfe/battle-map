import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MapTokens } from '@bm/map/services';
import { Token } from '@bm/models';

@Component({
  selector: 'bm-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.scss']
})
export class TokenDialogComponent {
  tokens$ = this.mapTokens.tokens$;

  constructor(
    private mapTokens: MapTokens,
    private dialogRef: MatDialogRef<TokenDialogComponent>
  ) { }

  onTokenClick(token: Token) {
    this.dialogRef.close(token);
  }
}
