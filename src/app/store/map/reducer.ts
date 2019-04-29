import * as Actions from './actions';
import { initialMapState } from './initial';
import { MapState } from './state';

const ZOOM_SF_INCREMENT = 0.1;

export function mapReducer(state: MapState = initialMapState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case Actions.SetBackgroundImage.TYPE: {
      const background = action.background;
      const gridOffset = {
        x: state.canvas.width / 2 - background.width / 2,
        y: state.canvas.height / 2 - background.height / 2
      };
      return { ...state, background, gridOffset };
    }
    case Actions.SetCanvas.TYPE: {
      return { ...state, canvas: action.canvas, context: action.canvas.getContext('2d') };
    }
    case Actions.Pan.TYPE: {
      const x = state.gridOffset.x + action.offset.x;
      const y = state.gridOffset.y + action.offset.y;
      return { ...state, gridOffset: { x, y } };
    }
    case Actions.ZoomIn.TYPE: {
      return { ...state, scaleFactor: state.scaleFactor + ZOOM_SF_INCREMENT };
    }
    case Actions.ZoomOut.TYPE: {
      return { ...state, scaleFactor: state.scaleFactor - ZOOM_SF_INCREMENT };
    }
    default: return state;
  }
}
