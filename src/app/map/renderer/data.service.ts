import { Injectable } from '@angular/core';
import { MapCanvas, MapController } from '@bm/map/services';

import { RenderMiddleware } from './middleware.service';
import { ImageRenderData } from './models';

// export const CREATURE_PADDING = 4;

const NO_IMAGE: ImageRenderData = { image: undefined, x: 0, y: 0, width: 0, height: 0, draw: false };

@Injectable()
export class RenderData {
  constructor(
    private canvas: MapCanvas,
    private controller: MapController,
    private middleware: RenderMiddleware
  ) {

  }

  background(): ImageRenderData {
    const image = this.canvas.background;
    if (!image) { return NO_IMAGE; }
    return {
      image,
      x: this.panX(0),
      y: this.panY(0),
      width: this.scaleN(image.width),
      height: this.scaleN(image.height),
      draw: true
    };
  }

  private panX(x: number): number { return x + this.controller.pan.x; }
  private panY(y: number): number { return y + this.controller.pan.y; }
  private scaleN(n: number): number { return n * this.controller.scale; }
}
