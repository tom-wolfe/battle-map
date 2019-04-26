import { initialMapState } from '@bm/store/initial';
import { MapState } from '@bm/store/state';

import * as Actions from './actions';

export function mapReducer(state: MapState = initialMapState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case (Actions.SetBackgroundImage.TYPE): {
      return { ...state, background: action.background };
    }
    default: return state;
  }
}