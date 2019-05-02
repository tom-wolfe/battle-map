import { Injectable } from '@angular/core';
import * as Tokens from '@bm/store/tokens';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../state';
import * as BattlefieldActions from './actions';

@Injectable()
export class BattlefieldEffects {
  constructor(private action$: Actions, private store: Store<AppState>) { }

  @Effect() loadCreatureImages$ = this.action$.pipe(
    ofType<BattlefieldActions.AddCreature>(BattlefieldActions.AddCreature.TYPE),
    withLatestFrom(
      this.store.pipe(select(Tokens.tokens)),
      this.store.pipe(select(Tokens.images))
    ),
    map(([action, tokens, images]) => {
      const token = tokens.find(t => t.id === action.creature.tokenId);
      return images[token.imageUrl] ? null : new Tokens.LoadImage(token.id);
    }),
  );
}
