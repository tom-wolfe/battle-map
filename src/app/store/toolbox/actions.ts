import { Action } from '@ngrx/store';

export class SetActiveTool implements Action {
  public static readonly TYPE = '[Toolbox] Set Active Tool';
  readonly type = SetActiveTool.TYPE;
  constructor(public toolId: number) { }
}

export class SetActiveToken implements Action {
  public static readonly TYPE = '[Toolbox] Set Active Token';
  readonly type = SetActiveToken.TYPE;
  constructor(public tokenId: number) { }
}

export type ToolboxActions = SetActiveTool | SetActiveToken;
