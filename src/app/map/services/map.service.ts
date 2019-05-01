import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as MapStore from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MapNavigator } from './navigator.service';

@Injectable()
export class Map {
  public readonly canvas: Observable<HTMLCanvasElement>;
  public readonly context: Observable<CanvasRenderingContext2D>;
  public readonly background: Observable<ImageBitmap>;
  public readonly grid: Observable<MapStore.Grid>;

  constructor(private store: Store<AppState>, private navigator: MapNavigator) {
    this.canvas = this.store.pipe(select(MapStore.canvas));
    this.context = this.store.pipe(select(MapStore.context));
    this.background = this.store.pipe(select(MapStore.background));
    this.grid = this.store.pipe(select(MapStore.grid));
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.store.dispatch(new MapStore.SetCanvas(canvas));
  }

  setBackground(image: ImageBitmap) {
    this.store.dispatch(new MapStore.SetBackground(image));
    this.navigator.fitToScreen();
  }

  setGridSize(size: number) {
    this.store.dispatch(new MapStore.SetGridSize(size));
  }

  setGridOffset(offset: Point) {
    this.store.dispatch(new MapStore.SetGridOffset(offset));
  }
}
