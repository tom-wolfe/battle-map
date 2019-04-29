import * as Actions from './actions';
import { initialMapState } from './initial';
import { MapState } from './state';

export function mapReducer(state: MapState = initialMapState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case Actions.SetBackgroundImage.TYPE: {
      return { ...state, background: action.background };
    }
    case Actions.ZoomIn.TYPE: {
      return { ...state, scaleFactor: state.scaleFactor + 0.1 };
    }
    case Actions.ZoomOut.TYPE: {
      return { ...state, scaleFactor: state.scaleFactor - 0.1 };
    }
    default: return state;
  }
}