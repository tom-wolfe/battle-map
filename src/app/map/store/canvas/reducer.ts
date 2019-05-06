import * as Actions from './actions';
import { initialState } from './initial';
import { CanvasState } from './state';

export function canvasReducer(state: CanvasState = initialState, action: Actions.CanvasActions): CanvasState {
  switch (action.type) {
    case Actions.SetBackground.TYPE: {
      return { ...state, background: action.background };
    }
    case Actions.SetCanvas.TYPE: {
      return { ...state, element: action.element };
    }
    default: return state;
  }
}
