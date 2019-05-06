import { Injectable } from '@angular/core';
import * as Tokens from '@bm/map/store/tokens';
import { AppState } from '@bm/store/state';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import * as BattlefieldActions from './actions';

@Injectable()
export class BattlefieldEffects {
  constructor(private action$: Actions, private store: Store<AppState>) { }

  @Effect() loadImageNewCreature$ = this.action$.pipe(
    ofType<BattlefieldActions.AddCreature>(BattlefieldActions.AddCreature.TYPE),
    withLatestFrom(
      this.store.pipe(select(Tokens.tokens)),
      this.store.pipe(select(Tokens.images))
    ),
    switchMap(([action, tokens, images]) => {
      const token = tokens.find(t => t.id === action.creature.tokenId);
      return images[token.imageUrl] ? [] : [new Tokens.LoadImage(token.id)];
    }),
  );

  @Effect() loadImageChangeToken$ = this.action$.pipe(
    ofType<BattlefieldActions.SetCreatureToken>(BattlefieldActions.SetCreatureToken.TYPE),
    withLatestFrom(
      this.store.pipe(select(Tokens.tokens)),
      this.store.pipe(select(Tokens.images))
    ),
    switchMap(([action, tokens, images]) => {
      const token = tokens.find(t => t.id === action.tokenId);
      return images[token.imageUrl] ? [] : [new Tokens.LoadImage(token.id)];
    }),
  );
}
