import { Point } from '@bm/models';

export interface MapState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gridSize: number;
  scaleFactor: number;
  gridOffset: Point;
  background: ImageBitmap;
}