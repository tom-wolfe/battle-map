import { Action } from '@ngrx/store';
import { Point } from '@bm/models';

export class Pan implements Action {
  public static readonly TYPE = '[Map] Pan';
  readonly type = Pan.TYPE;
  constructor(public offset: Point) { }
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
  Pan |
  SetBackgroundImage |
  SetCanvas |
  ZoomIn |
  ZoomOut;
