import { Injectable } from '@angular/core';
import * as Tokens from '@bm/map/store/tokens';
import { LoadTokens } from '@bm/map/store/tokens';
import { Token, TokenGroup } from '@bm/models';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable()
export class MapTokens {
  public readonly tokens$ = this.store.pipe(select(Tokens.tokens));

  public readonly tokenGroups$ = this.tokens$.pipe(
    map(tokens => _.uniq(tokens.map(t => t.type)).sort().map(group => ({
      name: group,
      tokens: tokens.filter(t => t.type === group)
    } as TokenGroup)))
  );

  public tokens: Token[];
  constructor(
    private store: Store<AppState>
  ) {
    this.tokens$.subscribe(t => this.tokens = t);
  }

  loadTokens() {
    this.store.dispatch(new LoadTokens());
  }
}
