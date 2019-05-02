import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.map.grid;

export const offset = createSelector(state, s => s.offset);
export const size = createSelector(state, s => s.size);
