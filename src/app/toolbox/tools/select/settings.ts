import { Injectable } from '@angular/core';
import { MapBattlefield } from '@bm/map/services';
import { Creature } from '@bm/models';
import { RenderTrigger } from '@bm/renderer';
import { AppState } from '@bm/store/state';
import * as SelectStore from '@bm/toolbox/store/select';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SelectToolSettings {
  public creatureId: number;
  public creature: Creature;

  public readonly creatureId$ = this.store.select(SelectStore.creature).pipe(tap(c => this.creatureId = c));
  public readonly creature$ = this.creatureId$.pipe(
    map(id => this.battlefield.creatures.find(c => c.id === id)),
    tap(c => this.creature = c),
    tap(() => this.render.trigger())
  );

  constructor(
    private store: Store<AppState>,
    private battlefield: MapBattlefield,
    private render: RenderTrigger
  ) { }

  setCreature(creature: Creature) {
    this.store.dispatch(new SelectStore.SetCreature(creature ? creature.id : null));
  }
}
