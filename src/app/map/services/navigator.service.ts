import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as MapStore from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MapNavigator {
  private readonly tempPan = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly tempScale = new BehaviorSubject<number>(1);
  private readonly pan$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly scale$ = new BehaviorSubject<number>(1);

  public readonly pan = combineLatest(this.tempPan, this.pan$).pipe(map(([t, p]) => ({ x: p.x + t.x, y: p.y + t.y })));
  public readonly scale = combineLatest(this.tempScale, this.scale$).pipe(map(([t, s]) => s * t));
  public readonly navigation = combineLatest(this.pan, this.scale).pipe(map(([pan, scale]) => ({ pan, scale } as MapStore.Navigation)));

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(MapStore.pan)).subscribe(p => this.pan$.next(p));
    this.store.pipe(select(MapStore.scale)).subscribe(s => this.scale$.next(s));
  }

  livePan(offset: Point) { this.tempPan.next(offset); }
  liveZoom(scale: number) { this.tempScale.next(scale); }
  endPan() { this.panTo(this.tempPan.value); }
  panTo(offset: Point) { this.store.dispatch(new MapStore.Pan(offset)); this.tempPan.next({ x: 0, y: 0 }); }
  zoomTo(scale: number, origin: Point) { this.store.dispatch(new MapStore.Zoom(scale, origin)); this.tempScale.next(1); }
  zoomIn(origin?: Point) { this.store.dispatch(new MapStore.ZoomIn(origin)); this.tempScale.next(1); }
  zoomOut(origin?: Point) { this.store.dispatch(new MapStore.ZoomOut(origin)); this.tempScale.next(1); }
  fitToScreen() { this.store.dispatch(new MapStore.FitToScreen()); }
}
