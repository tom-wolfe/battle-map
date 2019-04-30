import { Injector } from '@angular/core';
import { Map } from '@bm/map/services';
import { ToolHandler } from '@bm/toolbox';

export class TokenHandler implements ToolHandler {
  private map: Map;
  private canvas: HTMLCanvasElement;

  constructor(injector: Injector) {
    this.map = injector.get(Map);
    this.map.canvas.subscribe(this.onCanvasChange.bind(this));
  }

  onCanvasChange(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.addEventListener('click', this.onCanvasClick.bind(this));
  }

  onCanvasClick(e: MouseEvent) {
    console.log('Token clicked!');
  }

  destroy() {
    this.canvas.removeEventListener('click', this.onCanvasClick.bind(this));
  }
}
