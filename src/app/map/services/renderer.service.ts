import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';

import { MapBattlefield } from './battlefield.service';
import { MapCanvas } from './canvas.service';
import { MapController } from './controller.service';
import { MapGrid } from './grid.service';

@Injectable()
export class MapRenderer {
  constructor(private controller: MapController, private canvas: MapCanvas, private grid: MapGrid, private battlefield: MapBattlefield) {
    combineLatest(
      controller.pan$,
      controller.scale$,
      canvas.background$,
      canvas.element$,
      canvas.context$,
      grid.offset$,
      grid.size$,
      battlefield.creatures$
    ).subscribe(this.render.bind(this));
  }

  render() {
    if (!this.canvas.context) { return; }
    this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
    this.renderBackground();
    this.renderGrid();
    this.renderCreatures();
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
    // Vertical lines.
    for (let x = startX; x <= this.canvas.element.width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.element.height);
    }
    // Horizontal lines
    for (let y = startY; y <= this.canvas.element.height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.element.width, y);
    }
    this.canvas.context.stroke(grid);
  }

  private renderCreatures() {
    const gridSize = this.scaleN(this.grid.size);

    this.battlefield.creatures.forEach(creature => {
      if (!creature.image) { return; }
      const point = this.grid.cellPoint(creature.location);
      this.canvas.context.drawImage(creature.image, point.x, point.y, gridSize, gridSize);
    });
  }

  private panX(x: number) { return x + this.controller.pan.x; }
  private panY(y: number) { return y + this.controller.pan.y; }
  private scaleN(n: number) { return n * this.controller.scale; }

  private boundCoordinate(ord: number) {
    const gridSize = this.scaleN(this.grid.size);
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord;
  }
}
