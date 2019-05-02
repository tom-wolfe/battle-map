import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../state';
import * as TokensActions from './actions';
import * as Selectors from './selectors';

@Injectable()
export class TokensEffects {
  constructor(private action$: Actions, private store: Store<AppState>) { }

  @Effect() loadImage$ = this.action$.pipe(
    ofType<TokensActions.LoadImage>(TokensActions.LoadImage.TYPE),
    withLatestFrom(this.store.pipe(select(Selectors.tokens))),
    switchMap(([action, tokens]) => {
      const token = tokens.find(t => t.id === action.tokenId);
      return new Promise<[string, ImageBitmap]>((resolve, reject) => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => createImageBitmap(img)
          .then(i => resolve([token.imageUrl, i]))
          .catch(reject)
          .finally(() => img.remove());
        img.src = token.imageUrl;
      });
    }),
    map(([url, image]) => new TokensActions.SetImage(url, image))
  );
}
