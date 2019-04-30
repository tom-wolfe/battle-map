import { SaveData } from '@bm/models/save-data';
import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.map;

export const activeTool = createSelector(state, s => s.activeTool);
export const backgroundImage = createSelector(state, s => s.backgroundImage);
export const grid = createSelector(state, s => s.grid);
export const canvas = createSelector(state, s => s.canvas);
export const context = createSelector(state, s => s.context);
export const pan = createSelector(state, s => s.pan);
export const scale = createSelector(state, s => s.scale);

export const saveMap = createSelector(state, s => {
  // TODO: Export background image.
  return { backgroundImage: undefined, grid: s.grid } as SaveData;
});
