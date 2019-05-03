import { Injectable } from '@angular/core';
import { AppState } from '@bm/store/state';
import * as SelectStore from '@bm/toolbox/store/select';
import { Store } from '@ngrx/store';

@Injectable()
export class SelectToolSettings {
  public creature: number;

  public readonly creature$ = this.store.select(SelectStore.creature);

  constructor(private store: Store<AppState>) {
    this.creature$.subscribe(s => this.creature = s);
  }

  setCreature(creatureId: number) {
    this.store.dispatch(new SelectStore.SetCreature(creatureId));
  }
}
