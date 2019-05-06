import { Creature } from '@bm/models';

import * as Actions from './actions';
import { initialState } from './initial';
import { BattlefieldState } from './state';

export function battlefieldReducer(state: BattlefieldState = initialState, action: Actions.BattlefieldActions): BattlefieldState {
  switch (action.type) {
    case Actions.AddCreature.TYPE: return { ...state, creatures: [...state.creatures, action.creature] };
    case Actions.RemoveCreature.TYPE: return { ...state, creatures: state.creatures.filter(c => c.id !== action.creature.id) };
    case Actions.MoveCreature.TYPE:
    case Actions.SetCreatureName.TYPE:
    case Actions.SetCreatureSize.TYPE:
    case Actions.SetCreatureToken.TYPE:
      return { ...state, creatures: state.creatures.map(c => creatureReducer(c, action)) };
    default: return state;
  }
}

export function creatureReducer(creature: Creature, action: Actions.BattlefieldActions): Creature {
  switch (action.type) {
    case Actions.MoveCreature.TYPE: return (creature.id !== action.creature.id) ? creature : { ...creature, cell: action.cell };
    case Actions.SetCreatureName.TYPE: return (creature.id !== action.creature.id) ? creature : { ...creature, name: action.name };
    case Actions.SetCreatureSize.TYPE: return (creature.id !== action.creature.id) ? creature : { ...creature, size: action.size };
    case Actions.SetCreatureToken.TYPE: return (creature.id !== action.creature.id) ? creature : { ...creature, tokenId: action.tokenId };
    default: return creature;
  }
}
