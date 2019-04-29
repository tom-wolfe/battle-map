import { Point } from '@bm/models';

export interface MapState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  activeTool: number;
  gridSize: number;
  gridOffset: Point;
  panOffset: Point;
  scaleFactor: number;
  background: ImageBitmap;
}
