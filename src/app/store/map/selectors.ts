import { AppState } from '../state';
import { createSelector } from '@ngrx/store';

export const state = (state: AppState) => state.map;

export const backgroundImage = createSelector(state, state => state.background);