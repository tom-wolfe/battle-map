import { Injectable } from '@angular/core';
import { MapTokens } from '@bm/map/services';
import { Size } from '@bm/models';
import { AppState } from '@bm/store/state';
import * as CreatureStore from '@bm/toolbox/store/creature';
import { Store } from '@ngrx/store';

@Injectable()
export class CreatureToolSettings {
  public token: number;
  public size: Size;

  public readonly token$ = this.store.select(CreatureStore.token);
  public readonly size$ = this.store.select(CreatureStore.size);
  public readonly tokens$ = this.tokens.tokens$;

  constructor(
    private store: Store<AppState>,
    private tokens: MapTokens,
  ) {
    this.token$.subscribe(t => this.token = t);
    this.size$.subscribe(s => this.size = s);
  }

  setToken(tokenId: number) {
    const token = this.tokens.tokens.find(t => t.id === tokenId);
    this.store.dispatch(new CreatureStore.SetToken(token.id));
    this.setSize(token.defaultSize);
  }
  setSize(size: Size) { this.store.dispatch(new CreatureStore.SetSize(size)); }

}
