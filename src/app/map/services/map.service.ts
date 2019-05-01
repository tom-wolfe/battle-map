import { Injectable } from '@angular/core';
import * as MapStore from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

import { MapNavigator } from './navigator.service';

@Injectable()
export class Map {
  public background: ImageBitmap;

  public readonly background$ = this.store.pipe(select(MapStore.background));

  constructor(private store: Store<AppState>, private navigator: MapNavigator) {
    this.background$.subscribe(b => this.background = b);
  }

  setBackground(image: ImageBitmap) {
    this.store.dispatch(new MapStore.SetBackground(image));
    this.navigator.fitToScreen();
  }
}
