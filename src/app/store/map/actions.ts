import { Action } from '@ngrx/store';

export class SetBackgroundImage implements Action {
  public static readonly TYPE = '[Map] Set Background Image';
  readonly type = SetBackgroundImage.TYPE;
  constructor(public background: ImageBitmap) { }
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
  SetBackgroundImage |
  ZoomIn | 
  ZoomOut;