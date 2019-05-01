import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as Grid from '@bm/store/grid';
import * as MapStore from '@bm/store/map';
import * as Navigation from '@bm/store/navigation';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const FIT_PADDING = 20;
const ZOOM_SF_INCREMENT = 0.1;

@Injectable()
export class MapNavigator {
  private canvas: HTMLCanvasElement;
  private background: ImageBitmap;
  private grid: Grid.GridState;

  private readonly tempPan = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly tempScale = new BehaviorSubject<number>(1);
  private readonly pan$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly scale$ = new BehaviorSubject<number>(1);

  public readonly pan = combineLatest(this.tempPan, this.pan$).pipe(map(([t, p]) => ({ x: p.x + t.x, y: p.y + t.y })));
  public readonly scale = combineLatest(this.tempScale, this.scale$).pipe(map(([t, s]) => s * t));
  public readonly navigation = combineLatest(this.pan, this.scale).pipe(
    map(([pan, scale]) => ({ pan, scale } as Navigation.NavigationState))
  );

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(Navigation.pan)).subscribe(p => this.pan$.next(p));
    this.store.pipe(select(Navigation.scale)).subscribe(s => this.scale$.next(s));
    this.store.pipe(select(MapStore.background)).subscribe(b => this.background = b);
    this.store.pipe(select(MapStore.canvas)).subscribe(c => this.canvas = c);
    this.store.pipe(select(Grid.grid)).subscribe(g => this.grid = g);
  }

  livePan(offset: Point) { this.tempPan.next(offset); }
  liveZoom(scale: number) { this.tempScale.next(scale); }
  endPan() { this.panTo(this.tempPan.value); }

  panTo(offset: Point) {
    const absolute: Point = {
      x: this.pan$.value.x + offset.x,
      y: this.pan$.value.y + offset.y,
    };
    this.store.dispatch(new Navigation.SetPan(absolute));
    this.tempPan.next({ x: 0, y: 0 });
  }

  zoom(scale: number, origin: Point) {
    const pan = this.scalePoint(origin, scale);
    this.store.dispatch(new Navigation.SetScale(scale));
    this.store.dispatch(new Navigation.SetPan(pan));
    this.tempScale.next(1);
  }

  zoomTo(scale: number, origin: Point) {
    const newScale = this.scale$.value * scale;
    this.zoom(newScale, origin);
  }

  zoomIn(origin?: Point) {
    const newScale = Math.min(2.0, this.scale$.value + ZOOM_SF_INCREMENT);
    this.zoom(newScale, origin);
  }

  zoomOut(origin?: Point) {
    const newScale = Math.max(0.1, this.scale$.value - ZOOM_SF_INCREMENT);
    this.zoom(newScale, origin);
  }

  fitToScreen() {
    const xScale = (this.canvas.width - FIT_PADDING) / this.background.width;
    const yScale = (this.canvas.height - FIT_PADDING) / this.background.height;
    const scale = Math.min(xScale, yScale);
    const offset = this.centerImage(this.background, scale);

    this.store.dispatch(new Navigation.SetScale(scale));
    this.store.dispatch(new Navigation.SetPan(offset));
  }

  cellAt(point: Point): Point {
    const gridSize = this.grid.size * this.scale$.value;
    return {
      x: Math.floor((point.x - this.pan$.value.x - this.grid.offset.x) / gridSize),
      y: Math.floor((point.y - this.pan$.value.y - this.grid.offset.y) / gridSize)
    };
  }

  private centerImage(image: ImageBitmap, scale: number): Point {
    return {
      x: this.canvas.width / 2 - image.width * scale / 2,
      y: this.canvas.height / 2 - image.height * scale / 2
    };
  }

  private scalePoint(origin: Point, scale: number): Point {
    const canvasOrigin: Point = {
      x: origin.x - this.pan$.value.x,
      y: origin.y - this.pan$.value.y
    };
    const projectedCanvasOrigin: Point = {
      x: canvasOrigin.x / this.scale$.value * scale,
      y: canvasOrigin.y / this.scale$.value * scale
    };
    const pan = {
      x: this.pan$.value.x - (projectedCanvasOrigin.x - canvasOrigin.x),
      y: this.pan$.value.y - (projectedCanvasOrigin.y - canvasOrigin.y),
    };
    return pan;
  }
}
