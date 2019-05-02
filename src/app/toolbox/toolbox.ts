import { Injectable, Type } from '@angular/core';
import { AppState } from '@bm/store/state';
import * as ToolboxStore from '@bm/store/toolbox';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as Tools from './tools';

interface ToolRegister {
  tool: Tools.Tool;
  settings: Type<{}>;
}

@Injectable()
export class Toolbox {
  public readonly activeToolId$ = this.store.pipe(select(ToolboxStore.activeTool));
  public readonly activeTool$: Observable<Tools.Tool>;

  public activeTool: Tools.Tool;
  public register: ToolRegister[] = [];

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
    this.registerTool(mapTool, Tools.MapSettingsComponent);
    this.registerTool(creature, Tools.CreatureSettingsComponent);
    this.registerTool(move, undefined);
    this.registerTool(spellEffect, undefined);
    this.registerTool(paint, undefined);
    this.registerTool(distance, undefined);
    this.registerTool(zoom, Tools.ZoomSettingsComponent);
    this.activeTool$ = this.activeToolId$.pipe(map(id => this.tools.find(t => t.id === id)));
    this.activeTool$.subscribe(this.onToolChange.bind(this));
  }

  get tools(): Tools.Tool[] { return this.register.map(t => t.tool); }

  registerTool(tool: Tools.Tool, settings: Type<{}>) {
    this.register.push({ tool, settings });
  }

  setTool(tool: Tools.Tool) { this.store.dispatch(new ToolboxStore.SetActiveTool(tool.id)); }

  getToolSettingsComponent(tool: Tools.Tool): Type<{}> {
    return this.register.find(t => t.tool === tool).settings;
  }

  private onToolChange(tool: Tools.Tool) {
    if (this.activeTool) { this.activeTool.deactivate(); }
    this.activeTool = tool;
    if (this.activeTool) { this.activeTool.activate(); }
  }
}
