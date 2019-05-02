import { Size } from '@bm/models';
import { Action } from '@ngrx/store';

export class SetToken implements Action {
  public static readonly TYPE = '[Tools:Creature] Set Active Token';
  readonly type = SetToken.TYPE;
  constructor(public tokenId: number) { }
}

export class SetSize implements Action {
  public static readonly TYPE = '[Tools:Creature] Set Active Size';
  readonly type = SetSize.TYPE;
  constructor(public size: Size) { }
}

export type CreatureToolActions = SetToken | SetSize;
