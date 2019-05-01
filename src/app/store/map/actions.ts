import { Action } from '@ngrx/store';

export class SetBackground implements Action {
  public static readonly TYPE = '[Map] Set Background';
  readonly type = SetBackground.TYPE;
  constructor(public background: ImageBitmap) { }
}

export class SetCanvas implements Action {
  public static readonly TYPE = '[Map] Set Canvas';
  readonly type = SetCanvas.TYPE;
  constructor(public canvas: HTMLCanvasElement) { }
}

export type MapActions =
  SetBackground |
  SetCanvas;
