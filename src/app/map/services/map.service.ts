import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@bm/store/state';
import * as MapStore from '@bm/store/map';
import { Subject, BehaviorSubject } from 'rxjs';
import { MapState } from '@bm/store/map';
import { Point } from '@bm/models';

@Injectable()
export class Map {
  private readonly state$ = new Subject<MapState>();
  public readonly state = this.state$.asObservable();

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(MapStore.state)).subscribe(this.onMapChange.bind(this));
  }

  private onMapChange(map: MapState) { this.state$.next(map); }
}
