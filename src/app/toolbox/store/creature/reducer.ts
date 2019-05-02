import * as Actions from './actions';
import { initialState } from './initial';
import { CreatureToolState } from './state';

export function creatureReducer(state: CreatureToolState = initialState, action: Actions.CreatureToolActions): CreatureToolState {
  switch (action.type) {
    case Actions.SetActiveToken.TYPE: return { ...state, activeToken: action.tokenId };
    default: return state;
  }
}
