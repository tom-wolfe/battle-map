import { Injectable } from '@angular/core';
import { AppState } from '@bm/store/state';
import { Store } from '@ngrx/store';

@Injectable()
export class MapCreatures {
  constructor(private store: Store<AppState>) {

  }

  addCreature() { }

}
