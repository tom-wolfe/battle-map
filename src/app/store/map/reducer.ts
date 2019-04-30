import * as Actions from './actions';
import { initialMapState } from './initial';
import { MapState, Navigation } from './state';
import { Point } from '@bm/models';

const ZOOM_SF_INCREMENT = 0.1;


export function mapReducer(state: MapState = initialMapState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case Actions.SetActiveTool.TYPE: {
      return { ...state, activeTool: action.toolId };
    }
    case Actions.SetBackground.TYPE: {
      return { ...state, background: action.background };
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
    case Actions.SetPan.TYPE: {
      return { ...state, navigation: { ...state.navigation, pan: action.offset } };
    }
    case Actions.SetScale.TYPE: {
      return { ...state, navigation: { ...state.navigation, scale: action.scale } };
    }
    case Actions.Zoom.TYPE: {
      const scale = state.navigation.scale * action.scale;
      const pan = scalePoint(state.navigation, action.origin, scale);
      return { ...state, navigation: { ...state.navigation, scale, pan } };
    }
    case Actions.Pan.TYPE: {
      const x = state.navigation.pan.x + action.offset.x;
      const y = state.navigation.pan.y + action.offset.y;
      return { ...state, navigation: { ...state.navigation, pan: { x, y } } };
    }
    case Actions.ZoomIn.TYPE: {
      const scale = Math.min(2.0, state.navigation.scale + ZOOM_SF_INCREMENT);
      const pan = scalePoint(state.navigation, action.origin || canvasCenter(state), scale);
      return { ...state, navigation: { ...state.navigation, scale, pan } };
    }
    case Actions.ZoomOut.TYPE: {
      const scale = Math.max(0.2, state.navigation.scale - ZOOM_SF_INCREMENT);
      const pan = scalePoint(state.navigation, action.origin || canvasCenter(state), scale);
      return { ...state, navigation: { ...state.navigation, scale, pan } };
    }
    default: return state;
  }
}

function canvasCenter(state: MapState): Point {
  return {
    x: state.canvas.width / 2,
    y: state.canvas.height / 2
  };
}

function centerImage(state: MapState, image: ImageBitmap, scale: number): Point {
  return {
    x: state.canvas.width / 2 - image.width * scale / 2,
    y: state.canvas.height / 2 - image.height * scale / 2
  };
}

function scalePoint(navigation: Navigation, origin: Point, scale: number): Point {
  const canvasOrigin: Point = {
    x: origin.x - navigation.pan.x,
    y: origin.y - navigation.pan.y
  };
  const projectedCanvasOrigin: Point = {
    x: canvasOrigin.x / navigation.scale * scale,
    y: canvasOrigin.y / navigation.scale * scale
  };
  const pan = {
    x: navigation.pan.x - (projectedCanvasOrigin.x - canvasOrigin.x),
    y: navigation.pan.y - (projectedCanvasOrigin.y - canvasOrigin.y),
  };
  return pan;
}
