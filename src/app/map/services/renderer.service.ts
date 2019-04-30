import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import { GridSettings, MapState } from '@bm/store/map';

import { Map } from './map.service';

@Injectable()
export class MapRenderer {
  backgroundImage: ImageBitmap;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  grid: GridSettings;
  panOffset: Point;
  scale: number;
  tempOffset: Point = { x: 0, y: 0 };
  tempScale = 1;

  constructor(map: Map) {
    map.state.subscribe(this.onMapStateChanged.bind(this));
  }

  public setTempOffset(offset: Point) {
    this.tempOffset = offset;
    this.render();
  }

  public setTempScale(scale: number) {
    this.tempScale = scale;
    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    this.renderGrid();
  }

  private renderBackground() {
    const bg = this.backgroundImage;
    if (!bg) { return; }
    this.context.drawImage(bg, this.offsetX(0), this.offsetY(0), this.scaleN(bg.width), this.scaleN(bg.height));
  }

  private renderGrid() {
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

    const gridSize = this.scaleN(this.grid.size);

    const startX = this.boundCoordinate(this.offsetX(this.scaleN(this.grid.offset.x) + gridSize));
    const startY = this.boundCoordinate(this.offsetY(this.scaleN(this.grid.offset.y) + gridSize));

    const grid = new Path2D();
    for (let x = startX; x <= this.canvas.width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.height);
    }
    for (let y = startY; y <= this.canvas.height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.width, y);
    }
    this.context.stroke(grid);
  }

  private offsetX(x: number) { return x + this.tempOffset.x + this.panOffset.x; }
  private offsetY(y: number) { return y + this.tempOffset.y + this.panOffset.y; }
  private scaleN(n: number) { return n * (this.tempScale * this.scale); }

  private boundCoordinate(ord: number) {
    const gridSize = this.scaleN(this.grid.size);
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord;
  }

  private onMapStateChanged(state: MapState) {
    this.backgroundImage = state.backgroundImage;
    this.canvas = state.canvas;
    this.context = state.context;
    this.grid = state.grid;
    this.panOffset = state.panOffset;
    this.scale = state.scale;
    this.render();
  }
}
