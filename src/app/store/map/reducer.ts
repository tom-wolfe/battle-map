import * as Actions from './actions';
import { initialMapState } from './initial';
import { MapState } from './state';

const ZOOM_SF_INCREMENT = 0.1;
const FIT_PADDING = 20;

export function mapReducer(state: MapState = initialMapState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case Actions.FitToScreen.TYPE: {
      const wsf = (state.canvas.width - FIT_PADDING) / state.backgroundImage.width;
      const hsf = (state.canvas.height - FIT_PADDING) / state.backgroundImage.height;
      const scaleFactor = Math.min(wsf, hsf);
      const panOffset = centerImage(state, state.backgroundImage, scaleFactor);
      return { ...state, scaleFactor, panOffset };
    }
    case Actions.SetActiveTool.TYPE: {
      return { ...state, activeTool: action.toolId };
    }
    case Actions.SetBackgroundImage.TYPE: {
      const backgroundImage = action.background;
      const panOffset = centerImage(state, backgroundImage, state.scaleFactor);
      return { ...state, backgroundImage, panOffset, scaleFactor: 1 };
    }
    case Actions.SetCanvas.TYPE: {
      return { ...state, canvas: action.canvas, context: action.canvas.getContext('2d') };
    }
    case Actions.SetGridOffset.TYPE: {
      return { ...state, grid: { ...state.grid, offset: action.offset } };
    }
    case Actions.SetGridSize.TYPE: {
      return { ...state, grid: { ...state.grid, size: action.size } };
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

function centerImage(state: MapState, image: ImageBitmap, scaleFactor: number) {
  return {
    x: state.canvas.width / 2 - image.width * scaleFactor / 2,
    y: state.canvas.height / 2 - image.height * scaleFactor / 2
  };
}
