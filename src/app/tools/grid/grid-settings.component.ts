import { Component } from '@angular/core';
import { Map } from '@bm/map/services';
import { GridSettings } from '@bm/store/map';

@Component({
  selector: 'bm-grid-settings',
  templateUrl: './grid-settings.component.html'
})
export class GridSettingsComponent {
  grid: GridSettings

  constructor(private map: Map) {
    this.map.grid.subscribe(g => this.grid = g);
  }

  onGridSizeChange(e: Event) {
    this.map.setGridSize(Number((e.target as HTMLInputElement).value));
  }

  onGridOffsetChange(x: string, y: string) {
    this.map.setGridOffset({ x: Number(x), y: Number(y) });
  }
}
