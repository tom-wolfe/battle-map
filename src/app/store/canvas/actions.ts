import { Action } from '@ngrx/store';

export class SetCanvas implements Action {
  public static readonly TYPE = '[Canvas] Set Canvas';
  readonly type = SetCanvas.TYPE;
  constructor(public element: HTMLCanvasElement) { }
}

export type CanvasActions = SetCanvas;
