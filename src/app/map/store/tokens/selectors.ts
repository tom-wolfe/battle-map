import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

const state = (s: AppState) => s.map.tokens;

export const tokens = createSelector(state, s => _.sortBy(s.tokens, 'name'));
export const images = createSelector(state, s => s.images);
