import { Action } from '@ngrx/store';

export class SetActiveTool implements Action {
  public static readonly TYPE = '[Toolbox] Set Active Tool';
  readonly type = SetActiveTool.TYPE;
  constructor(public toolId: number) { }
}

export type ToolboxActions = SetActiveTool;
