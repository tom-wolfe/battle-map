import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.map.navigation;

export const pan = createSelector(state, s => s.pan);
export const scale = createSelector(state, s => s.scale);
