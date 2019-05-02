import { Action } from '@ngrx/store';

export class SetActiveToken implements Action {
  public static readonly TYPE = '[Tools:Creature] Set Active Token';
  readonly type = SetActiveToken.TYPE;
  constructor(public tokenId: number) { }
}

export type CreatureToolActions = SetActiveToken;
