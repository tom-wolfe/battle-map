import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.grid;

export const offset = createSelector(state, s => s.offset);
export const size = createSelector(state, s => s.size);
