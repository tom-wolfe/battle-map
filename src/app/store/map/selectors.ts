import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.map;

export const background = createSelector(state, s => s.background);
