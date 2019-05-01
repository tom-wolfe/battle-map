import { Action } from '@ngrx/store';

export class SetBackground implements Action {
  public static readonly TYPE = '[Map] Set Background';
  readonly type = SetBackground.TYPE;
  constructor(public background: ImageBitmap) { }
}

export type MapActions = SetBackground;
