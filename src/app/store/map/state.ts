import { Point } from '@bm/models';

export interface MapState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  activeTool: number;
  grid: GridSettings;
  pan: Point;
  scale: number;
  backgroundImage: ImageBitmap;
}

export interface GridSettings {
  size: number;
  offset: Point;
}
