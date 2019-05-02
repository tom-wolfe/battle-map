import { Component } from '@angular/core';
import { MapGrid, MapCanvas } from '@bm/map/services';
import { Point } from '@bm/models';

@Component({
  selector: 'bm-map-settings',
  templateUrl: './map-settings.component.html'
})
export class MapSettingsComponent {
  size: number;
  offset: Point;

  constructor(private grid: MapGrid, private canvas: MapCanvas) {
    this.grid.size$.subscribe(s => this.size = s);
    this.grid.offset$.subscribe(o => this.offset = o);
  }

  onLoadImageClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.onchange = this.onBackgroundChange.bind(this);
    document.body.appendChild(input);
    input.click();
  }

  onSizeChange(e: Event) {
    this.grid.setSize(Number((e.target as HTMLInputElement).value));
  }

  onOffsetChange(x: string, y: string) {
    this.grid.setOffset({ x: Number(x), y: Number(y) });
  }

  private onBackgroundChange(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    createImageBitmap(file).then(image => this.canvas.setBackground(image));
  }
}
