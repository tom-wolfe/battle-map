import { Action } from '@ngrx/store';
import { Creature } from '@bm/models';

export class AddCreature implements Action {
  public static readonly TYPE = '[Battlefield] Add Creature';
  readonly type = AddCreature.TYPE;
  constructor(public creature: Creature) { }
}

export class RemoveCreature implements Action {
  public static readonly TYPE = '[Battlefield] Remove Creature';
  readonly type = RemoveCreature.TYPE;
  constructor(public creature: Creature) { }
}

export type BattlefieldActions = AddCreature | RemoveCreature;
