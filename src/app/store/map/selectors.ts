import { AppState } from '../state';
import { createSelector } from '@ngrx/store';
import { SaveData } from '@bm/models/save-data';

export const state = (s: AppState) => s.map;

export const activeTool = createSelector(state, s => s.activeTool);
export const backgroundImage = createSelector(state, s => s.backgroundImage);
export const gridOffset = createSelector(state, s => s.grid.offset);
export const gridSize = createSelector(state, s => s.grid.size);

export const saveMap = createSelector(state, s => {
  // TODO: Export background image.
  return { backgroundImage: undefined, grid: s.grid } as SaveData;
});