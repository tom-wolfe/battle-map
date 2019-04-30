import { MapState } from './state';

export const initialMapState: MapState = {
  activeTool: undefined,
  canvas: undefined,
  context: undefined,
  grid: {
    size: 80,
    offset: { x: 0, y: 0 }
  },
  scale: 1,
  pan: { x: 0.5, y: 0.5 },
  backgroundImage: undefined
};
