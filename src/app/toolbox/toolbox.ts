import { Injectable, Type } from '@angular/core';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as ToolboxStore from './store/active';
import * as Tools from './tools';

@Injectable()
export class Toolbox {
  public readonly activeToolId$ = this.store.pipe(select(ToolboxStore.activeTool));
  public readonly activeTool$: Observable<Tools.Tool>;

  public activeTool: Tools.Tool;
  public tools: Tools.Tool[] = [];

  constructor(
    private store: Store<AppState>,
    mapTool: Tools.MapTool,
    selectTool: Tools.SelectTool,
    creatureTool: Tools.CreatureTool,
    moveTool: Tools.MoveTool,
    spellEffectTool: Tools.SpellEffectTool,
    paintTool: Tools.PaintTool,
    distanceTool: Tools.DistanceTool,
    zoomTool: Tools.ZoomTool,
  ) {
    this.tools = [mapTool, selectTool, creatureTool, moveTool, /*spellEffectTool, paintTool, distanceTool,*/ zoomTool];
    this.activeTool$ = this.activeToolId$.pipe(map(id => this.tools.find(t => t.id === id)));
    this.activeTool$.subscribe(this.onToolChange.bind(this));
  }

  setTool(tool: Tools.Tool) { this.store.dispatch(new ToolboxStore.SetActiveTool(tool.id)); }

  private onToolChange(tool: Tools.Tool) {
    if (this.activeTool) { this.activeTool.deactivate(); }
    this.activeTool = tool;
    if (this.activeTool) { this.activeTool.activate(); }
  }
}
