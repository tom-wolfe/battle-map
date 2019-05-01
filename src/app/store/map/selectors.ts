import { SaveData } from '@bm/models/save-data';
import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.map;

export const activeTool = createSelector(state, s => s.activeTool);
export const background = createSelector(state, s => s.background);
export const grid = createSelector(state, s => s.grid);
export const canvas = createSelector(state, s => s.canvas);
export const context = createSelector(state, s => s.context);

export const saveMap = createSelector(state, s => {
  // TODO: Export background image.
  return { background: undefined, grid: s.grid } as SaveData;
});
