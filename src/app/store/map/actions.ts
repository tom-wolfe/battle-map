import { Action } from '@ngrx/store';

export class SetActiveTool implements Action {
  public static readonly TYPE = '[Map] Set Active Tool';
  readonly type = SetActiveTool.TYPE;
  constructor(public toolId: number) { }
}

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
  SetActiveTool |
  SetBackground |
  SetCanvas;
