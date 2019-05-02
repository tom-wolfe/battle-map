import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.map.canvas;

export const background = createSelector(state, s => s.background);
export const context = createSelector(state, s => s.context);
export const element = createSelector(state, s => s.element);
