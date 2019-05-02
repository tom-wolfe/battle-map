import { Injectable } from '@angular/core';
import * as Battlefield from '@bm/map/store/battlefield';
import { BattlefieldCreature, Creature } from '@bm/models';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

@Injectable()
export class MapBattlefield {
  public creatures: BattlefieldCreature[];

  public readonly creatures$ = this.store.pipe(select(Battlefield.creatures));

  constructor(private store: Store<AppState>) {
    this.creatures$.subscribe(c => this.creatures = c);
  }

  addCreature(creature: Creature) {
    this.store.dispatch(new Battlefield.AddCreature(creature));
  }
}
