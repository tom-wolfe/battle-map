import { Injectable } from '@angular/core';
import { AppState } from '@bm/store/state';
import * as ToolboxStore from '@bm/store/toolbox';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as Tools from './tools';

@Injectable()
export class Toolbox {
  public readonly activeToolId$ = this.store.pipe(select(ToolboxStore.activeTool));
  public readonly activeTool$ = this.activeToolId$.pipe(map(id => this.tools.find(t => t.id === id)));

  public activeTool: Tools.Tool;
  public tools: Tools.Tool[] = [];

  constructor(
    private store: Store<AppState>,
    mapTool: Tools.MapTool,
    creature: Tools.CreatureTool,
    move: Tools.MoveTool,
    spellEffect: Tools.SpellEffectTool,
    paint: Tools.PaintTool,
    distance: Tools.DistanceTool,
    zoom: Tools.ZoomTool,
  ) {
    this.tools = [mapTool, creature, move, spellEffect, paint, distance, zoom];
    this.activeTool$.subscribe(this.onToolChange.bind(this));
  }

  setTool(tool: Tools.Tool) { this.store.dispatch(new ToolboxStore.SetActiveTool(tool.id)); }

  private onToolChange(tool: Tools.Tool) {
    if (this.activeTool) { tool.deactivate(); }
    this.activeTool = tool;
    if (this.activeTool) { tool.activate(); }
  }
}
