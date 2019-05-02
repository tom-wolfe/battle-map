import { Injectable } from '@angular/core';
import { AppState } from '@bm/store/state';
import * as Tokens from '@bm/store/tokens';
import { select, Store } from '@ngrx/store';

@Injectable()
export class MapTokens {
  public readonly tokens$ = this.store.pipe(select(Tokens.tokens));
  constructor(private store: Store<AppState>) { }
}
