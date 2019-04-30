import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as MapStore from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class Map {
  private readonly state$ = new Subject<MapStore.MapState>();
  public readonly state = this.state$.asObservable();

  private readonly grid$ = new BehaviorSubject<MapStore.GridSettings>(undefined);
  public readonly grid = this.grid$.asObservable();

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(MapStore.state)).subscribe(s => this.state$.next(s));
    this.store.pipe(select(MapStore.grid)).subscribe(g => this.grid$.next(g));
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.store.dispatch(new MapStore.SetCanvas(canvas));
  }

  setBackground(image: ImageBitmap) {
    this.store.dispatch(new MapStore.SetBackgroundImage(image));
  }

  setGridSize(size: number) {
    this.store.dispatch(new MapStore.SetGridSize(size));
  }

  setGridOffset(offset: Point) {
    this.store.dispatch(new MapStore.SetGridOffset(offset));
  }

  zoomIn() {
    this.store.dispatch(new MapStore.ZoomIn({ x: 0, y: 0 }));
  }

  zoomOut() {
    this.store.dispatch(new MapStore.ZoomOut({ x: 0, y: 0 }));
  }

  fitToScreen() {
    this.store.dispatch(new MapStore.FitToScreen());
  }
}
