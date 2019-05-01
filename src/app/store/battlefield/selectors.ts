import { createSelector } from '@ngrx/store';

import { AppState } from '../state';

const state = (s: AppState) => s.battlefield;

export const creatures = createSelector(state, s => s.creatures);
