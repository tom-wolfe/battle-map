import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.toolbox.creature;

export const activeToken = createSelector(state, s => s.activeToken);
