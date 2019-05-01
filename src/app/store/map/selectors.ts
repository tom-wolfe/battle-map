import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.map;

export const activeTool = createSelector(state, s => s.activeTool);
export const background = createSelector(state, s => s.background);
export const canvas = createSelector(state, s => s.canvas);
export const context = createSelector(state, s => s.context);
