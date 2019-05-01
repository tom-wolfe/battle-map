import * as Actions from './actions';
import { initialState } from './initial';
import { MapState } from './state';

export function mapReducer(state: MapState = initialState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case Actions.SetBackground.TYPE: {
      return { ...state, background: action.background };
    }
    default: return state;
  }
}
