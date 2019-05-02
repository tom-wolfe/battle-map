import * as Actions from './actions';
import { initialState } from './initial';
import { CreatureToolState } from './state';

export function creatureReducer(state: CreatureToolState = initialState, action: Actions.CreatureToolActions): CreatureToolState {
  switch (action.type) {
    case Actions.SetToken.TYPE: return { ...state, token: action.tokenId };
    case Actions.SetSize.TYPE: return { ...state, size: action.size };
    default: return state;
  }
}
