import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.tokens;

export const tokens = createSelector(state, s => s.tokens);
export const images = createSelector(state, s => s.images);
