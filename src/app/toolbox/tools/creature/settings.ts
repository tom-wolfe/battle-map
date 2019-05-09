import { Injectable } from '@angular/core';
import { MapTokens } from '@bm/map/services';
import { Size, Token } from '@bm/models';
import { AppState } from '@bm/store/state';
import * as CreatureStore from '@bm/toolbox/store/creature';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CreatureToolSettings {
  public tokenId: number;
  public token: Token;
  public size: Size;

  public readonly tokenId$ = this.store.select(CreatureStore.token);
  public readonly tokens$ = this.tokens.tokens$;
  public readonly token$ = combineLatest(this.tokenId$, this.tokens$).pipe(
    map(([id, tokens]) => tokens.find(t => t.id === id))
  );

  public readonly size$ = this.store.select(CreatureStore.size);

  constructor(
    private store: Store<AppState>,
    private tokens: MapTokens,
  ) {
    this.size$.subscribe(s => this.size = s);
    this.token$.subscribe(t => { this.tokenId = t ? t.id : undefined; this.token = t; });
  }

  setToken(tokenId: number) {
    const token = this.tokens.tokens.find(t => t.id === tokenId);
    this.store.dispatch(new CreatureStore.SetToken(token.id));
    this.setSize(token.defaultSize);
  }
  setSize(size: Size) { this.store.dispatch(new CreatureStore.SetSize(size)); }

}
