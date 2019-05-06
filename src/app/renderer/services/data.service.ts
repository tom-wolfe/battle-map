import { Injectable } from '@angular/core';
import { CreatureRenderData, GridRenderData, ImageRenderData } from '@bm/renderer/models';

import { RenderCore } from './core.service';
import { RenderMiddleware } from './middleware.service';

@Injectable()
export class RenderData {
  constructor(
    private core: RenderCore,
    private middleware: RenderMiddleware
  ) { }

  background(): ImageRenderData {
    const data = this.core.background();
    this.middleware.background(data);
    return data;
  }

  grid(): GridRenderData {
    const data = this.core.grid();
    this.middleware.grid(data);
    return data;
  }

  creatures(): CreatureRenderData[] {
    const data = this.core.creatures();
    this.middleware.creatures(data);
    return data;
  }
}
