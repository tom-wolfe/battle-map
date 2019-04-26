import { Action } from '@ngrx/store';

export class SetBackgroundImage implements Action {
  public static readonly TYPE = '[Map] Set Background Image';
  readonly type = SetBackgroundImage.TYPE;
  constructor(public background: ImageBitmap) { }
}

export type MapActions =
  SetBackgroundImage;