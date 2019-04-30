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
  pan: Point;
  scale: number;
  tempPan: Point = { x: 0, y: 0 };
  tempScale = 1;

  constructor(map: Map) {
    map.state.subscribe(this.onMapStateChanged.bind(this));
  }

  public setTempPan(offset: Point) {
    this.tempPan = offset;
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
    this.context.drawImage(bg, this.panX(0), this.panY(0), this.scaleN(bg.width), this.scaleN(bg.height));
  }

  private renderGrid() {
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

    const gridSize = this.scaleN(this.grid.size);

    const startX = this.boundCoordinate(this.panX(this.scaleN(this.grid.offset.x) + gridSize));
    const startY = this.boundCoordinate(this.panY(this.scaleN(this.grid.offset.y) + gridSize));

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

  private panX(x: number) { return x + this.tempPan.x + this.pan.x; }
  private panY(y: number) { return y + this.tempPan.y + this.pan.y; }
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
    this.pan = state.pan;
    this.scale = state.scale;
    this.render();
  }
}
