import { Injectable } from '@angular/core';
import { Creature } from '@bm/models';
import * as Battlefield from '@bm/store/battlefield';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

@Injectable()
export class MapBattlefield {
  public creatures: Creature[];

  public readonly creatures$ = this.store.pipe(select(Battlefield.creatures));

  constructor(private store: Store<AppState>) {
    this.creatures$.subscribe(c => this.creatures = c);
  }

  addCreature(creature: Creature) {
    this.store.dispatch(new Battlefield.AddCreature(creature));
  }
}
