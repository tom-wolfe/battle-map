import { Injectable } from '@angular/core';
import * as MapStore from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { Store, select } from '@ngrx/store';
import { Point } from '@bm/models';
import { Pan, Zoom, pan, scale } from '@bm/store/map';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable()
export class MapNavigator {
  private readonly tempPan = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly tempScale = new BehaviorSubject<number>(1);
  private readonly pan$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  private readonly scale$ = new BehaviorSubject<number>(1);

  public readonly pan = combineLatest(this.tempPan, this.pan$).pipe(map(([temp, pan]) => ({
    x: temp.x + pan.x,
    y: temp.y + pan.y
  })));

  public readonly scale = combineLatest(this.tempScale, this.scale$).pipe(map(([temp, scale]) => scale * temp));

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(pan)).subscribe(p => this.pan$.next(p));
    this.store.pipe(select(scale)).subscribe(s => this.scale$.next(s));
  }

  livePan(offset: Point) { this.tempPan.next(offset); }
  liveZoom(scale: number) { this.tempScale.next(scale); }
  endPan() { this.panTo(this.tempPan.value); }
  panTo(offset: Point) { this.store.dispatch(new Pan(offset)); this.tempPan.next({ x: 0, y: 0 }); }
  zoomTo(scale: number, origin: Point) { this.store.dispatch(new Zoom(scale, origin)); this.tempScale.next(1); }
  zoomIn(origin?: Point) { this.store.dispatch(new MapStore.ZoomIn(origin)); this.tempScale.next(1); }
  zoomOut(origin?: Point) { this.store.dispatch(new MapStore.ZoomOut(origin)); this.tempScale.next(1); }
  fitToScreen() { this.store.dispatch(new MapStore.FitToScreen()); }
}
