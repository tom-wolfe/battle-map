import * as Actions from './actions';
import { initialState } from './initial';
import { ToolboxState, CreatureToolSettings } from './state';

export function activeToolReducer(state: number, action: Actions.ToolboxActions): number {
  switch (action.type) {
    case Actions.SetActiveTool.TYPE: return action.toolId;
    default: return state;
  }
}

export function creatureReducer(state: CreatureToolSettings, action: Actions.ToolboxActions): CreatureToolSettings {
  switch (action.type) {
    case Actions.SetActiveToken.TYPE: return { ...state, activeToken: action.tokenId };
    default: return state;
  }
}

export function toolboxReducer(state: ToolboxState = initialState, action: Actions.ToolboxActions): ToolboxState {
  return {
    activeTool: activeToolReducer(state.activeTool, action),
    creature: creatureReducer(state.creature, action)
  };
}
