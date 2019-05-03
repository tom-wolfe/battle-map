import * as Tokens from '@bm/map/store/tokens';
import { BattlefieldCreature } from '@bm/models';
import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

const state = (s: AppState) => s.map.battlefield;

export const lastCreatureId = createSelector(state, s => _.max(s.creatures.map(c => c.id)) || 0);

export const creatures = createSelector(
  state, Tokens.tokens, Tokens.images,
  (s, tokens, images) => s.creatures.map(c => {
    const token = tokens.find(t => t.id === c.tokenId);
    return {
      ...c,
      image: images[token.imageUrl],
      token
    } as BattlefieldCreature;
  })
);
