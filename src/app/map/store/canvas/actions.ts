import { Action } from '@ngrx/store';

export class SetCanvas implements Action {
  public static readonly TYPE = '[Canvas] Set Canvas';
  readonly type = SetCanvas.TYPE;
  constructor(public element: HTMLCanvasElement) { }
}

export class SetBackground implements Action {
  public static readonly TYPE = '[Canvas] Set Background';
  readonly type = SetBackground.TYPE;
  constructor(public background: HTMLImageElement) { }
}

export type CanvasActions = SetCanvas | SetBackground;
