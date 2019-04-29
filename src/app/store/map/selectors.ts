import { AppState } from '../state';
import { createSelector } from '@ngrx/store';

export const state = (s: AppState) => s.map;

export const activeTool = createSelector(state, s => s.activeTool);
export const backgroundImage = createSelector(state, s => s.background);
