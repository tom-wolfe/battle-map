import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.toolbox.select;

export const creature = createSelector(state, s => s.creature);
