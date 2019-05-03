import * as Actions from './actions';
import { initialState } from './initial';
import { SelectToolState } from './state';

export function selectReducer(state: SelectToolState = initialState, action: Actions.SelectToolActions): SelectToolState {
  switch (action.type) {
    case Actions.SetCreature.TYPE: return { ...state, creature: action.creatureId };
    default: return state;
  }
}
