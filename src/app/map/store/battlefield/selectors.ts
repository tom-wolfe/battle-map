import * as Tokens from '@bm/map/store/tokens';
import { BattlefieldCreature } from '@bm/models';
import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.map.battlefield;

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
