import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';

import { MapCanvas } from './canvas.service';
import { MapController } from './controller.service';
import { MapGrid } from './grid.service';

@Injectable()
export class MapRenderer {
  constructor(private controller: MapController, private canvas: MapCanvas, private grid: MapGrid) {
    combineLatest(
      controller.pan$,
      controller.scale$,
      canvas.background$,
      canvas.element$,
      canvas.context$,
      grid.offset$,
      grid.size$
    ).subscribe(this.render.bind(this));
  }

  render() {
    if (!this.canvas.context) { return; }
    this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
    this.renderBackground();
    this.renderGrid();
  }

  private renderBackground() {
    const bg = this.canvas.background;
    if (!bg) { return; }
    this.canvas.context.drawImage(bg, this.panX(0), this.panY(0), this.scaleN(bg.width), this.scaleN(bg.height));
  }

  private renderGrid() {
    this.canvas.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

    const gridSize = this.scaleN(this.grid.size);
    const startX = this.boundCoordinate(this.panX(this.scaleN(this.grid.offset.x) + gridSize));
    const startY = this.boundCoordinate(this.panY(this.scaleN(this.grid.offset.y) + gridSize));

    const grid = new Path2D();
    for (let x = startX; x <= this.canvas.element.width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.element.height);
    }
    for (let y = startY; y <= this.canvas.element.height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.element.width, y);
    }
    this.canvas.context.stroke(grid);
  }

  private panX(x: number) { return x + this.controller.pan.x; }
  private panY(y: number) { return y + this.controller.pan.y; }
  private scaleN(n: number) { return n * this.controller.scale; }

  private boundCoordinate(ord: number) {
    const gridSize = this.grid.size * this.controller.scale;
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord;
  }
}
