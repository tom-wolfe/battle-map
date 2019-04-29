import { MapState } from './state';

export const initialMapState: MapState = {
  activeTool: undefined,
  canvas: undefined,
  context: undefined,
  grid: {
    size: 80,
    offset: { x: 0, y: 0 }
  },
  scaleFactor: 1,
  panOffset: { x: 0.5, y: 0.5 },
  backgroundImage: undefined
};
