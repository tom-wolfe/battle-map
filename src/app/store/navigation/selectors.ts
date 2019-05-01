import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.navigation;

export const pan = createSelector(state, s => s.pan);
export const scale = createSelector(state, s => s.scale);
