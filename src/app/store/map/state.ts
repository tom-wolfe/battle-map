import { Point } from '@bm/models';

export interface MapState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  activeTool: number;
  grid: GridSettings;
  navigation: NavigationSettings;  
  backgroundImage: ImageBitmap;
}

export interface GridSettings {
  size: number;
  offset: Point;
}

export interface NavigationSettings {
  pan: Point;
  scale: number;
}
