import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.toolbox;

export const activeTool = createSelector(state, s => s.activeTool);
