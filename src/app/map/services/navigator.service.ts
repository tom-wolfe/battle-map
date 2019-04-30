import { Injectable } from '@angular/core';
import * as MapStore from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { Store } from '@ngrx/store';
import { Point } from '@bm/models';
import { Pan, Zoom } from '@bm/store/map';

@Injectable()
export class MapNavigator {
  constructor(private store: Store<AppState>) { }

  pan(offset: Point) { this.store.dispatch(new Pan(offset)); }
  zoom(scale: number, origin: Point) { this.store.dispatch(new Zoom(scale, origin)); }
  zoomIn(origin?: Point) { this.store.dispatch(new MapStore.ZoomIn(origin)); }
  zoomOut(origin?: Point) { this.store.dispatch(new MapStore.ZoomOut(origin)); }
  fitToScreen() { this.store.dispatch(new MapStore.FitToScreen()); }
}
