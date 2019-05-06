import { Injectable } from '@angular/core';
import { CreatureRenderData, GridRenderData, ImageRenderData } from '@bm/renderer/models';

export type Middleware<T> = (data: T) => void;

@Injectable()
export class RenderMiddleware {
  readonly backgroundMiddleware: Middleware<ImageRenderData>[] = [];
  readonly creaturesMiddleware: Middleware<CreatureRenderData[]>[] = [];
  readonly gridMiddleware: Middleware<GridRenderData>[] = [];

  background(data: ImageRenderData) { this.applyMiddleware(data, this.backgroundMiddleware); }
  creatures(data: CreatureRenderData[]) { this.applyMiddleware(data, this.creaturesMiddleware); }
  grid(data: GridRenderData) { this.applyMiddleware(data, this.gridMiddleware); }

  private applyMiddleware<T>(data: T, middleware: Middleware<T>[]) {
    middleware.forEach(m => m(data));
  }
}
