import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.grid;

export const grid = createSelector(state, s => s);
