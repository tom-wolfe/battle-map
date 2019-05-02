import * as Actions from './actions';
import { initialState } from './initial';
import { BattlefieldState } from './state';

export function battlefieldReducer(state: BattlefieldState = initialState, action: Actions.BattlefieldActions): BattlefieldState {
  switch (action.type) {
    case Actions.AddCreature.TYPE: return { ...state, creatures: [...state.creatures, action.creature] };
    default: return state;
  }
}
