import { MapState } from './state';

export const initialMapState: MapState = {
  activeTool: undefined,
  background: undefined,
  canvas: undefined,
  context: undefined,
  grid: {
    size: 80,
    offset: { x: 0, y: 0 }
  }
};
