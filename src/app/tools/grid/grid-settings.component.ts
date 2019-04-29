import { Component } from '@angular/core';
import { gridSize, SetGridSize, gridOffset, SetGridOffset } from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Point } from '@bm/models';

@Component({
  selector: 'bm-grid-settings',
  templateUrl: './grid-settings.component.html'
})
export class GridSettingsComponent {
  gridSize: number;
  gridOffset: Point;
  constructor(private store: Store<AppState>) {
    this.store.pipe(select(gridSize)).subscribe(s => this.gridSize = s);
    this.store.pipe(select(gridOffset)).subscribe(o => this.gridOffset = o);
  }

  onGridSizeChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.store.dispatch(new SetGridSize(Number(input.value)));
  }

  onGridOffsetChange(x: any, y: any) {
    this.store.dispatch(new SetGridOffset({ x: Number(x), y: Number(y)}));
  }
}
