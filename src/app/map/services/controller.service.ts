import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as Navigation from '@bm/store/navigation';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const ZOOM_SF_INCREMENT = 0.1;

@Injectable()
export class MapController {
  private readonly storePan$ = this.store.pipe(select(Navigation.pan));
  private readonly storeScale$ = this.store.pipe(select(Navigation.scale));
  private readonly tempPan$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly tempScale$ = new BehaviorSubject<number>(1);

  public pan: Point;
  public scale: number;

  public readonly pan$ = combineLatest(this.tempPan$, this.storePan$).pipe(map(([t, p]) => this.pan = { x: p.x + t.x, y: p.y + t.y }));
  public readonly scale$ = combineLatest(this.tempScale$, this.storeScale$).pipe(map(([t, s]) => this.scale = s * t));

  constructor(private store: Store<AppState>) {
    this.storePan$.subscribe()
  }

  livePan(offset: Point) { this.tempPan$.next(offset); }
  liveZoom(scale: number) { this.tempScale$.next(scale); }

  endPan() {
    this.store.dispatch(new Navigation.SetPan(this.pan));
    this.tempPan$.next({ x: 0, y: 0 });
  }

  zoom(scale: number, origin: Point) {
    const pan = this.scalePoint(origin, scale);
    this.store.dispatch(new Navigation.SetScale(scale));
    this.store.dispatch(new Navigation.SetPan(pan));
    this.tempScale$.next(1);
  }

  zoomTo(scale: number, origin: Point) {
    const newScale = this.scale * scale;
    this.zoom(newScale, origin);
  }

  zoomIn(origin?: Point) {
    const newScale = Math.min(2.0, this.scale + ZOOM_SF_INCREMENT);
    this.zoom(newScale, origin);
  }

  zoomOut(origin?: Point) {
    const newScale = Math.max(0.1, this.scale - ZOOM_SF_INCREMENT);
    this.zoom(newScale, origin);
  }

  private scalePoint(origin: Point, scale: number): Point {
    const canvasOrigin: Point = {
      x: origin.x - this.pan.x,
      y: origin.y - this.pan.y
    };
    const projectedCanvasOrigin: Point = {
      x: canvasOrigin.x / this.scale * scale,
      y: canvasOrigin.y / this.scale * scale
    };
    const pan = {
      x: this.pan.x - (projectedCanvasOrigin.x - canvasOrigin.x),
      y: this.pan.y - (projectedCanvasOrigin.y - canvasOrigin.y),
    };
    return pan;
  }
}
