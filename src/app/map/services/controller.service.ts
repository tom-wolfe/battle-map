import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as Navigation from '@bm/map/store/navigation';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapCanvas } from './canvas.service';

const ZOOM_SF_INCREMENT = 0.1;

@Injectable()
export class MapController {
  private readonly storePan$ = this.store.pipe(select(Navigation.pan));
  private readonly storeScale$ = this.store.pipe(select(Navigation.scale));
  private readonly tempPan$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly tempScale$ = new BehaviorSubject<number>(1);
  private readonly enabledValue$ = new Subject<boolean>();

  public pan: Point;
  private storeScale: number;
  public scale: number;

  public readonly enabled$ = this.enabledValue$.asObservable();
  public readonly pan$ = combineLatest(this.tempPan$, this.storePan$);
  public readonly scale$ = combineLatest(this.tempScale$, this.storeScale$);

  constructor(private store: Store<AppState>, private canvas: MapCanvas) {
    this.canvas.element$.subscribe(e => this.setEnabled(true));
    this.scale$.subscribe(([t, s]) => {
      this.storeScale = s;
      this.scale = s * t;
    });
    this.pan$.subscribe(([t, p]) => this.pan = { x: p.x + t.x, y: p.y + t.y });
  }

  setEnabled(enabled: boolean) { this.enabledValue$.next(enabled); }

  livePan(offset: Point) { this.tempPan$.next(offset); }
  liveZoom(scale: number) { this.tempScale$.next(scale); }

  endPan() {
    this.store.dispatch(new Navigation.SetPan(this.pan));
    this.tempPan$.next({ x: 0, y: 0 });
  }

  zoom(scale: number, origin?: Point) {
    origin = origin || ({ x: this.canvas.element.width / 2, y: this.canvas.element.height / 2 });
    const pan = this.scalePoint(origin, scale);
    this.store.dispatch(new Navigation.SetScale(scale));
    this.store.dispatch(new Navigation.SetPan(pan));
    this.tempScale$.next(1);
  }

  zoomTo(scale: number, origin: Point) {
    scale = scale * this.storeScale;
    const pan = this.scalePoint(origin, scale);
    this.store.dispatch(new Navigation.SetScale(scale));
    this.store.dispatch(new Navigation.SetPan(pan));
    this.tempPan$.next({x: 0, y: 0});
    this.tempScale$.next(1);
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
