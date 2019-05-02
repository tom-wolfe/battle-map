import { Injectable } from '@angular/core';
import * as Tokens from '@bm/map/store/tokens';
import { Token } from '@bm/models';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

@Injectable()
export class MapTokens {
  public readonly tokens$ = this.store.pipe(select(Tokens.tokens));
  public tokens: Token[];
  constructor(private store: Store<AppState>) {
    this.tokens$.subscribe(t => this.tokens = t);
  }
}
