import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MapTokens } from '@bm/map/services';
import { Token, TokenGroup } from '@bm/models';
import * as _ from 'lodash';

@Component({
  selector: 'bm-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.scss']
})
export class TokenDialogComponent {
  searchText = '';
  tokenGroups: TokenGroup[] = [];

  constructor(
    private mapTokens: MapTokens,
    private dialogRef: MatDialogRef<TokenDialogComponent>
  ) {
    this.mapTokens.tokenGroups$.subscribe(t => this.tokenGroups = t);
  }

  tokenId = (_i: number, t: Token): string => t.id.toString();
  groupName = (_i: number, g: TokenGroup): string => g.name;

  get filteredTokenGroups(): TokenGroup[] {
    return this.tokenGroups.map(group => ({
      name: group.name,
      tokens: group.tokens.filter(t => {
        if (t.name.toUpperCase().includes(this.searchText.toUpperCase())) { return true; }
        // TODO: Tags and environments && types.
        return false;
      })
    })
    ).filter(t => t.tokens.length);
  }

  onTokenClick(token: Token) {
    this.dialogRef.close(token);
  }
}
