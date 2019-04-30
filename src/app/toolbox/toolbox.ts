import { Injectable } from '@angular/core';
import { activeTool, SetActiveTool } from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as Tools from './tools';

@Injectable()
export class Toolbox {
  tools: Tools.Tool[] = [];

  private readonly activeToolId$ = new Subject<number>();
  public readonly activeToolId = this.activeToolId$.asObservable();
  private readonly activeTool$ = new Subject<Tools.Tool>();
  public readonly activeTool = this.activeTool$.asObservable();

  constructor(private store: Store<AppState>) {
    this.tools = [
      new Tools.GridTool(),
      new Tools.BackgroundImageTool(),
      new Tools.TokenTool(),
      new Tools.MoveTool(),
      new Tools.EffectTool(),
      new Tools.PaintTool(),
      new Tools.DistanceTool(),
      new Tools.ZoomTool()
    ];
    store.pipe(select(activeTool)).subscribe(this.onActiveToolIdChange.bind(this));
  }

  setTool(tool: Tools.Tool) {
    this.store.dispatch(new SetActiveTool(tool.id));
  }

  private onActiveToolIdChange(id: number) {
    const active = this.tools.find(t => t.id === id);
    this.activeToolId$.next(id);
    this.activeTool$.next(active);
  }
}
