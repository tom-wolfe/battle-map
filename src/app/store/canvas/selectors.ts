import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.canvas;

export const element = createSelector(state, s => s.element);
export const context = createSelector(state, s => s.context);
