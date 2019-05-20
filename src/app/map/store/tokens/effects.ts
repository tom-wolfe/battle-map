import { Injectable } from '@angular/core';
import { Monsters } from '@bm/data';
import { Token } from '@bm/models';
import { AppState } from '@bm/store/state';
import { fetchImage } from '@bm/utils';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as TokensActions from './actions';
import * as Selectors from './selectors';

@Injectable()
export class TokensEffects {
  constructor(
    private action$: Actions,
    private store: Store<AppState>,
    private monsters: Monsters
  ) { }

  @Effect() loadTokens$ = this.action$.pipe(
    ofType<TokensActions.LoadTokens>(TokensActions.LoadTokens.TYPE),
    switchMap(() => this.monsters.get()),
    map(monsters => {
      let id = 0;
      return monsters.filter(m => m.image).map(m => ({
        id: id++,
        name: m.name,
        type: m.type,
        environments: m.environments,
        tags: m.tags,
        imageUrl: this.monsters.resolveImage(m.image.url),
        defaultSize: m.size
      }) as Token);
    }),
    map(tokens => new TokensActions.SetTokens(tokens))
  );

  @Effect() loadImage$ = this.action$.pipe(
    ofType<TokensActions.LoadImage>(TokensActions.LoadImage.TYPE),
    withLatestFrom(this.store.pipe(select(Selectors.tokens))),
    switchMap(([action, tokens]) => {
      const token = tokens.find(t => t.id === action.tokenId);
      return fetchImage(token.imageUrl).then(image => ({ url: token.imageUrl, image }));
    }),
    map(({ url, image }) => new TokensActions.SetImage(url, image))
  );
}
