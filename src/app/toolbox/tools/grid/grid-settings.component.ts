import { Component } from '@angular/core';
import { Map } from '@bm/map/services';
import { GridState } from '@bm/store/grid';

@Component({
  selector: 'bm-grid-settings',
  templateUrl: './grid-settings.component.html'
})
export class GridSettingsComponent {
  grid: GridState;

  constructor(private map: Map) {
    this.map.grid.subscribe(g => this.grid = g);
  }

  onSizeChange(e: Event) {
    this.map.setGridSize(Number((e.target as HTMLInputElement).value));
  }

  onOffsetChange(x: string, y: string) {
    this.map.setGridOffset({ x: Number(x), y: Number(y) });
  }
}
