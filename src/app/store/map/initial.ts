import { MapState } from './state';

export const initialMapState: MapState = {
  canvas: undefined,
  context: undefined,
  gridSize: 80,
  scaleFactor: 1,
  gridOffset: { x: 0.5, y: 0.5 },
  background: undefined
};
