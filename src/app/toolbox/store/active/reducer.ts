import * as Actions from './actions';
import { initialState } from './initial';
import { ActiveToolboxState } from './state';

export function activeReducer(state: ActiveToolboxState = initialState, action: Actions.ToolboxActions): ActiveToolboxState {
  switch (action.type) {
    case Actions.SetActiveTool.TYPE: return { ...state, activeTool: action.toolId };
    default: return state;
  }
}
