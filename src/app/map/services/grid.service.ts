import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as Grid from '@bm/store/grid';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

import { MapNavigator } from './navigator.service';

@Injectable()
export class MapGrid {
  public size: number;
  public offset: Point;

  public readonly size$ = this.store.pipe(select(Grid.size));
  public readonly offset$ = this.store.pipe(select(Grid.offset));

  constructor(private navigator: MapNavigator, private store: Store<AppState>) {
    this.size$.subscribe(s => this.size = s);
    this.offset$.subscribe(o => this.offset = o);
  }

  setSize(size: number) { this.store.dispatch(new Grid.SetSize(size)); }
  setOffset(offset: Point) { this.store.dispatch(new Grid.SetOffset(offset)); }

  cellAt(point: Point): Point {
    const gridSize = this.size * this.navigator.scale;
    return {
      x: Math.floor((point.x - this.navigator.pan.x - this.offset.x) / gridSize),
      y: Math.floor((point.y - this.navigator.pan.y - this.offset.y) / gridSize)
    };
  }
}
