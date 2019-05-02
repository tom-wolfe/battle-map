import { Action } from '@ngrx/store';

export class LoadImage implements Action {
  public static readonly TYPE = '[Tokens] Load Image';
  readonly type = LoadImage.TYPE;
  constructor(public tokenId: number) { }
}

export class SetImage implements Action {
  public static readonly TYPE = '[Tokens] Set Image';
  readonly type = SetImage.TYPE;
  constructor(public url: string, public image: ImageBitmap) { }
}

export type TokensActions = LoadImage | SetImage;
