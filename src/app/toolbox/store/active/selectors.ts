import { AppState } from '@bm/store/state';
import { createSelector } from '@ngrx/store';

const state = (s: AppState) => s.toolbox.active;

export const activeTool = createSelector(state, s => s.activeTool);
