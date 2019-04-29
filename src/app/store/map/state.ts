import { Point } from '@bm/models';

export interface MapState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  activeTool: number;
  grid: {
    size: number;
    offset: Point;
  };
  panOffset: Point;
  scaleFactor: number;
  backgroundImage: ImageBitmap;
}
