import { Creature, Point, Size } from '@bm/models';
import { Action } from '@ngrx/store';

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

export class SetCreatureName implements Action {
  public static readonly TYPE = '[Battlefield] Set Creature Name';
  readonly type = SetCreatureName.TYPE;
  constructor(public creature: Creature, public name: string) { }
}

export class SetCreatureSize implements Action {
  public static readonly TYPE = '[Battlefield] Set Creature Size';
  readonly type = SetCreatureSize.TYPE;
  constructor(public creature: Creature, public size: Size) { }
}

export class SetCreatureToken implements Action {
  public static readonly TYPE = '[Battlefield] Set Creature Token';
  readonly type = SetCreatureToken.TYPE;
  constructor(public creature: Creature, public tokenId: number) { }
}

export type BattlefieldActions = AddCreature | RemoveCreature | MoveCreature | SetCreatureName | SetCreatureSize | SetCreatureToken;
