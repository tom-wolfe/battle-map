import { Injector } from '@angular/core';
import { Map, MapNavigator } from '@bm/map/services';
import { ToolHandler } from '@bm/toolbox';
import { relativeMouse } from '@bm/utils';

export class TokenHandler implements ToolHandler {
  private map: Map;
  private navigator: MapNavigator;
  private canvas: HTMLCanvasElement;

  private onCanvasClick = this.canvasClick.bind(this);

  constructor(injector: Injector) {
    this.map = injector.get(Map);
    this.navigator = injector.get(MapNavigator);
    this.map.canvas.subscribe(this.onCanvasChange.bind(this));
  }

  onCanvasChange(canvas: HTMLCanvasElement) {
    if (this.canvas) { this.removeEvents(); }
    this.canvas = canvas;
    this.addEvents();
  }

  canvasClick(e: MouseEvent) {
    const point = relativeMouse(e, this.canvas);
    const cell = this.navigator.cellAt(point);
    console.log(cell);
  }

  destroy() { this.removeEvents(); }

  private addEvents() {
    this.canvas.addEventListener('click', this.onCanvasClick);
  }

  private removeEvents() {
    this.canvas.removeEventListener('click', this.onCanvasClick);
  }
}
