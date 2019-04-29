import { Action } from '@ngrx/store';
import { Point } from '@bm/models';

export class FitToScreen implements Action {
  public static readonly TYPE = '[Map] Fit To Screen';
  readonly type = FitToScreen.TYPE;
  constructor() { }
}

export class Pan implements Action {
  public static readonly TYPE = '[Map] Pan';
  readonly type = Pan.TYPE;
  constructor(public offset: Point) { }
}

export class SetActiveTool implements Action {
  public static readonly TYPE = '[Map] Set Active Tool';
  readonly type = SetActiveTool.TYPE;
  constructor(public toolId: number) { }
}

export class SetBackgroundImage implements Action {
  public static readonly TYPE = '[Map] Set Background Image';
  readonly type = SetBackgroundImage.TYPE;
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

export class ZoomIn implements Action {
  public static readonly TYPE = '[Map] Zoom In';
  readonly type = ZoomIn.TYPE;
  constructor() { }
}

export class ZoomOut implements Action {
  public static readonly TYPE = '[Map] Zoom Out';
  readonly type = ZoomOut.TYPE;
  constructor() { }
}

export type MapActions =
  FitToScreen |
  Pan |
  SetActiveTool |
  SetBackgroundImage |
  SetCanvas |
  SetGridOffset |
  SetGridSize |
  ZoomIn |
  ZoomOut;
