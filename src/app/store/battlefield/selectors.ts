import { createSelector } from '@ngrx/store';

import { AppState } from '../state';
import * as Tokens from '@bm/store/tokens';
import { BattlefieldCreature } from '@bm/models';

const state = (s: AppState) => s.battlefield;

export const creatures = createSelector(
  state, Tokens.tokens, Tokens.images,
  (s, tokens, images) => s.creatures.map(c => {
    const token = tokens.find(t => t.id === c.tokenId);
    return {
      image: images[token.imageUrl],
      location: c.location,
      token
    } as BattlefieldCreature;
  })
);
