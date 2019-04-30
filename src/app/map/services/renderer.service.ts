import { Injectable } from '@angular/core';
import { Grid, Navigation } from '@bm/store/map';

import { Map } from './map.service';
import { MapNavigator } from './navigator.service';

@Injectable()
export class MapRenderer {
  canvas: HTMLCanvasElement;
  background: ImageBitmap;
  context: CanvasRenderingContext2D;
  grid: Grid;
  navigation: Navigation;

  constructor(map: Map, navigator: MapNavigator) {
    map.context.subscribe(this.onContextChange.bind(this));
    map.canvas.subscribe(this.onCanvasChange.bind(this));
    map.background.subscribe(this.onBackgroundChange.bind(this));
    map.grid.subscribe(this.onGridChange.bind(this));
    navigator.navigation.subscribe(this.onNavigationChange.bind(this));
  }

  private onContextChange(context: CanvasRenderingContext2D) { this.context = context; this.render(); }
  private onCanvasChange(c: HTMLCanvasElement) { this.canvas = c; this.render(); }
  private onGridChange(g: Grid) { this.grid = g; this.render(); }
  private onNavigationChange(n: Navigation) { this.navigation = n; this.render(); }
  private onBackgroundChange(b: ImageBitmap) { this.background = b; this.render(); }

  render() {
    if (!this.context) { return; }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    this.renderGrid();
  }

  private renderBackground() {
    const bg = this.background;
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

  private panX(x: number) { return x +  this.navigation.pan.x; }
  private panY(y: number) { return y + this.navigation.pan.y; }
  private scaleN(n: number) { return n * this.navigation.scale; }

  private boundCoordinate(ord: number) {
    const gridSize = this.scaleN(this.grid.size);
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord;
  }
}
