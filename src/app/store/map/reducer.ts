import * as Actions from './actions';
import { initialMapState } from './initial';
import { MapState } from './state';

const ZOOM_SF_INCREMENT = 0.1;

export function mapReducer(state: MapState = initialMapState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case Actions.SetActiveTool.TYPE: {
      return { ...state, activeTool: action.toolId };
    }
    case Actions.SetBackgroundImage.TYPE: {
      const background = action.background;
      const panOffset = {
        x: state.canvas.width / 2 - background.width / 2,
        y: state.canvas.height / 2 - background.height / 2
      };
      return { ...state, background, panOffset, scaleFactor: 1 };
    }
    case Actions.SetCanvas.TYPE: {
      return { ...state, canvas: action.canvas, context: action.canvas.getContext('2d') };
    }
    case Actions.SetGridOffset.TYPE: {
      return { ...state, gridOffset: action.offset };
    }
    case Actions.SetGridSize.TYPE: {
      return { ...state, gridSize: action.size };
    }
    case Actions.Pan.TYPE: {
      const x = state.panOffset.x + action.offset.x;
      const y = state.panOffset.y + action.offset.y;
      return { ...state, panOffset: { x, y } };
    }
    case Actions.ZoomIn.TYPE: {
      return { ...state, scaleFactor: Math.min(2.0, state.scaleFactor + ZOOM_SF_INCREMENT) };
    }
    case Actions.ZoomOut.TYPE: {
      return { ...state, scaleFactor: Math.max(0.2, state.scaleFactor - ZOOM_SF_INCREMENT) };
    }
    default: return state;
  }
}
