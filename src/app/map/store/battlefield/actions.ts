import { Action } from '@ngrx/store';
import { Creature, Point } from '@bm/models';

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

export class MoveCreature implements Action {
  public static readonly TYPE = '[Battlefield] Move Creature';
  readonly type = MoveCreature.TYPE;
  constructor(public creature: Creature, public cell: Point) { }
}

export type BattlefieldActions = AddCreature | RemoveCreature | MoveCreature;
