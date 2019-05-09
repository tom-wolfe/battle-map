import { Action } from '@ngrx/store';
import { Token } from '@bm/models';

export class LoadTokens implements Action {
  public static readonly TYPE = '[Tokens] Load Tokens';
  readonly type = LoadTokens.TYPE;
  constructor() { }
}

export class SetTokens implements Action {
  public static readonly TYPE = '[Tokens] Set Tokens';
  readonly type = SetTokens.TYPE;
  constructor(public tokens: Token[]) { }
}

export class LoadImage implements Action {
  public static readonly TYPE = '[Tokens] Load Image';
  readonly type = LoadImage.TYPE;
  constructor(public tokenId: number) { }
}

export class SetImage implements Action {
  public static readonly TYPE = '[Tokens] Set Image';
  readonly type = SetImage.TYPE;
  constructor(public url: string, public image: HTMLImageElement) { }
}

export type TokensActions = LoadTokens | SetTokens | LoadImage | SetImage;
