import { Action } from '@ngrx/store';
import { Point } from '@bm/models';

export class SetPan implements Action {
  public static readonly TYPE = '[Navigation] Set Pan';
  readonly type = SetPan.TYPE;
  constructor(public offset: Point) { }
}

export class SetScale implements Action {
  public static readonly TYPE = '[Navigation] Set Scale';
  readonly type = SetScale.TYPE;
  constructor(public scale: number) { }
}

export type NavigationActions = SetPan | SetScale;
