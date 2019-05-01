import * as Actions from './actions';
import { initialState } from './initial';
import { ToolboxState } from './state';

export function toolboxReducer(state: ToolboxState = initialState, action: Actions.ToolboxActions): ToolboxState {
  switch (action.type) {
    case Actions.SetActiveTool.TYPE: return { ...state, activeTool: action.toolId };
    default: return state;
  }
}
