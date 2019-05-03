import { Injectable } from '@angular/core';
import * as Battlefield from '@bm/map/store/battlefield';
import { BattlefieldCreature, Creature, Point } from '@bm/models';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

@Injectable()
export class MapBattlefield {
  private lastCreatureId: number;

  public creatures: BattlefieldCreature[];

  public readonly lastCreatureId$ = this.store.pipe(select(Battlefield.lastCreatureId));
  public readonly creatures$ = this.store.pipe(select(Battlefield.creatures));

  constructor(private store: Store<AppState>) {
    this.creatures$.subscribe(c => this.creatures = c);
    this.lastCreatureId$.subscribe(i => this.lastCreatureId = i);
  }

  creatureAtCell(cell: Point): Creature {
    // TODO: Make this work for larger creatures.
    return this.creatures.find(c => c.location.x === cell.x && c.location.y === cell.y);
  }

  addCreature(creature: Creature) {
    const existing = this.creatures.find(c => c.location.x === creature.location.x && c.location.y === creature.location.y);
    // TODO: Figure out if size overlaps too.
    if (existing) { return; }
    creature.id = this.lastCreatureId + 1;
    this.store.dispatch(new Battlefield.AddCreature(creature));
  }

  removeCreature(creature: Creature) {
    this.store.dispatch(new Battlefield.RemoveCreature(creature));
  }
}
