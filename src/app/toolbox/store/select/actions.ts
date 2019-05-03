import { Action } from '@ngrx/store';

export class SetCreature implements Action {
  public static readonly TYPE = '[Tools:Select] Set Selected Creature';
  readonly type = SetCreature.TYPE;
  constructor(public creatureId: number) { }
}

export type SelectToolActions = SetCreature;
