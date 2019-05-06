import { Injectable } from '@angular/core';
import * as Battlefield from '@bm/map/store/battlefield';
import { BattlefieldCreature, Creature, Point, Size } from '@bm/models';
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
    return this.creatures.find(c =>
      (cell.x >= c.cell.x && cell.x < c.cell.x + c.sizeInfo.scale) &&
      (cell.y >= c.cell.y && cell.y < c.cell.y + c.sizeInfo.scale)
    );
  }

  addCreature(creature: Creature) {
    const existing = this.creatureAtCell(creature.cell);
    if (existing) { return; }
    creature.id = this.lastCreatureId + 1;
    this.store.dispatch(new Battlefield.AddCreature(creature));
  }

  moveCreature(creature: Creature, cell: Point) {
    this.store.dispatch(new Battlefield.MoveCreature(creature, cell));
  }

  removeCreature(creature: Creature) {
    this.store.dispatch(new Battlefield.RemoveCreature(creature));
  }

  setCreatureName(creature: Creature, name: string) {
    this.store.dispatch(new Battlefield.SetCreatureName(creature, name));
  }


  setCreatureSize(creature: Creature, size: Size) {
    this.store.dispatch(new Battlefield.SetCreatureSize(creature, size));
  }

  setCreatureToken(creature: Creature, tokenId: number) {
    this.store.dispatch(new Battlefield.SetCreatureToken(creature, tokenId));
  }
}
