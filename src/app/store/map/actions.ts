import { Action } from '@ngrx/store';
import { Point } from '@bm/models';

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

export class SetGridOffset implements Action {
  public static readonly TYPE = '[Map] Set Grid Offset';
  readonly type = SetGridOffset.TYPE;
  constructor(public offset: Point) { }
}

export class SetGridSize implements Action {
  public static readonly TYPE = '[Map] Set Grid Size';
  readonly type = SetGridSize.TYPE;
  constructor(public size: number) { }
}

export type MapActions =
  SetActiveTool |
  SetBackground |
  SetCanvas |
  SetGridOffset |
  SetGridSize;
