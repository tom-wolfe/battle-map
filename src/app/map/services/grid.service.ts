import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as Grid from '@bm/map/store/grid';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

import { MapController } from './controller.service';

@Injectable()
export class MapGrid {
  public size: number;
  public offset: Point;

  public readonly size$ = this.store.pipe(select(Grid.size));
  public readonly offset$ = this.store.pipe(select(Grid.offset));

  constructor(private controller: MapController, private store: Store<AppState>) {
    this.size$.subscribe(s => this.size = s);
    this.offset$.subscribe(o => this.offset = o);
  }

  setSize(size: number) { this.store.dispatch(new Grid.SetSize(size)); }
  setOffset(offset: Point) { this.store.dispatch(new Grid.SetOffset(offset)); }

  cellAt(point: Point): Point {
    const gridSize = this.size * this.controller.scale;
    return {
      x: Math.floor((point.x - this.controller.pan.x - this.offset.x) / gridSize),
      y: Math.floor((point.y - this.controller.pan.y - this.offset.y) / gridSize)
    };
  }

  cellPoint(cell: Point): Point {
    const gridSize = this.size * this.controller.scale;
    return {
      x: cell.x * gridSize + this.controller.pan.x + this.offset.x * this.controller.scale,
      y: cell.y * gridSize + this.controller.pan.y + this.offset.y * this.controller.scale,
    };
  }
}
