import { Injectable } from '@angular/core';
import * as ToolboxStore from '@bm/store/toolbox';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as Tools from './tools';
import { map } from 'rxjs/operators';

@Injectable()
export class Toolbox {
  tools: Tools.Tool[] = [];

  public readonly activeToolId$ = this.store.pipe(select(ToolboxStore.activeTool));
  public readonly activeTool$ = this.activeToolId$.pipe(map(id => this.tools.find(t => t.id === id)));

  constructor(private store: Store<AppState>) {
    this.tools = [
      new Tools.MapTool(),
      new Tools.CreatureTool(),
      new Tools.MoveTool(),
      new Tools.EffectTool(),
      new Tools.PaintTool(),
      new Tools.DistanceTool(),
      new Tools.ZoomTool()
    ];
  }

  setTool(tool: Tools.Tool) {
    this.store.dispatch(new ToolboxStore.SetActiveTool(tool.id));
  }
}
