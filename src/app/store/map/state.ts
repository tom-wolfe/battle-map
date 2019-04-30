import { Point } from '@bm/models';

export interface MapState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  activeTool: number;
  grid: Grid;
  navigation: Navigation;
  backgroundImage: ImageBitmap;
}

export interface Grid {
  size: number;
  offset: Point;
}

export interface Navigation {
  pan: Point;
  scale: number;
}
