import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.toolbox.creature;

export const token = createSelector(state, s => s.token);
export const size = createSelector(state, s => s.size);
