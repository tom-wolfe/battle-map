import * as Actions from './actions';
import { initialState } from './initial';
import { NavigationState } from './state';

export function navigationReducer(state: NavigationState = initialState, action: Actions.NavigationActions): NavigationState {
  switch (action.type) {
    case Actions.SetPan.TYPE: return { ...state, pan: action.offset };
    case Actions.SetScale.TYPE: return { ...state, scale: action.scale };
    default: return state;
  }
}
