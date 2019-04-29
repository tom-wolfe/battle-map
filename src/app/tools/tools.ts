import { Injectable } from '@angular/core';
import { activeTool } from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { BackgroundImageTool } from './background';
import { DistanceTool } from './distance';
import { EffectTool } from './effect';
import { GridTool } from './grid';
import { MoveTool } from './move';
import { PaintTool } from './paint';
import { TokenTool } from './token';
import { Tool } from './tool';
import { ZoomTool } from './zoom';

@Injectable()
export class Tools {
  tools: Tool[] = [];

  private readonly activeToolId$ = new Subject<number>();
  public readonly activeToolId = this.activeToolId$.asObservable();
  private readonly activeTool$ = new Subject<Tool>();
  public readonly activeTool = this.activeTool$.asObservable();

  constructor(store: Store<AppState>) {
    this.tools = [
      new GridTool(),
      new BackgroundImageTool(),
      new TokenTool(),
      new MoveTool(),
      new EffectTool(),
      new PaintTool(),
      new DistanceTool(),
      new ZoomTool()
    ];
    store.pipe(select(activeTool)).subscribe(this.onActiveToolIdChange.bind(this));
  }

  private onActiveToolIdChange(id: number) {
    const active = this.tools.find(t => t.id === id);
    this.activeToolId$.next(id);
    this.activeTool$.next(active);
  }
}
