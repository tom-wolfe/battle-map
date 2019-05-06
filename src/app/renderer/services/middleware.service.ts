import { Injectable } from '@angular/core';
import { CreatureRenderData, GridRenderData, ImageRenderData } from '@bm/renderer/models';

@Injectable()
export class RenderMiddleware {
  grid(data: GridRenderData) { }
  background(data: ImageRenderData) { }
  creatures(data: CreatureRenderData[]) { }
}
