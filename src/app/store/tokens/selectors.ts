import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import { AppState } from '../state';

const state = (s: AppState) => s.tokens;

export const tokens = createSelector(state, s => _.sortBy(s.tokens, 'name'));
export const images = createSelector(state, s => s.images);
