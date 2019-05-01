import { Injector } from '@angular/core';
import { MapGrid } from '@bm/map/services';
import { MapCanvas } from '@bm/map/services/canvas.service';
import { ToolHandler } from '@bm/toolbox';
import { relativeMouse } from '@bm/utils';

export class TokenHandler implements ToolHandler {
  private canvas: MapCanvas;
  private grid: MapGrid;

  private onCanvasClick = this.canvasClick.bind(this);

  constructor(injector: Injector) {
    this.canvas = injector.get(MapCanvas);
    this.grid = injector.get(MapGrid);
    this.canvas.element$.subscribe(this.onCanvasChange.bind(this));
  }

  onCanvasChange() {
    if (this.canvas.element) { this.removeEvents(); }
    this.addEvents();
  }

  canvasClick(e: MouseEvent) {
    const point = relativeMouse(e, this.canvas.element);
    const cell = this.grid.cellAt(point);
    console.log(cell);
  }

  destroy() { this.removeEvents(); }

  private addEvents() {
    this.canvas.element.addEventListener('click', this.onCanvasClick);
  }

  private removeEvents() {
    this.canvas.element.removeEventListener('click', this.onCanvasClick);
  }
}
