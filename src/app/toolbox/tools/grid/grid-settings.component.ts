import { Component } from '@angular/core';
import { MapGrid } from '@bm/map/services';
import { Point } from '@bm/models';

@Component({
  selector: 'bm-grid-settings',
  templateUrl: './grid-settings.component.html'
})
export class GridSettingsComponent {
  size: number;
  offset: Point;

  constructor(private grid: MapGrid) {
    this.grid.size$.subscribe(s => this.size = s);
    this.grid.offset$.subscribe(o => this.offset = o);
  }

  onSizeChange(e: Event) {
    this.grid.setSize(Number((e.target as HTMLInputElement).value));
  }

  onOffsetChange(x: string, y: string) {
    this.grid.setOffset({ x: Number(x), y: Number(y) });
  }
}
