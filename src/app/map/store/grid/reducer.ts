import * as Actions from './actions';
import { initialState } from './initial';
import { GridState } from './state';

export function gridReducer(state: GridState = initialState, action: Actions.GridActions): GridState {
  switch (action.type) {
    case Actions.SetOffset.TYPE: return { ...state, offset: action.offset };
    case Actions.SetSize.TYPE: return { ...state, size: action.size };
    default: return state;
  }
}
