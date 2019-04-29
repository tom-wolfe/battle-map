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

@Injectable()
export class Tools {
  tools: Tool[] = [];

  private readonly _activeToolId = new Subject<number>();
  public readonly activeToolId = this._activeToolId.asObservable();
  private readonly _activeTool = new Subject<Tool>();
  public readonly activeTool = this._activeTool.asObservable();

  constructor(store: Store<AppState>) {
    this.tools = [
      new GridTool(),
      new BackgroundImageTool(store),
      new TokenTool(),
      new MoveTool(),
      new EffectTool(),
      new PaintTool(),
      new DistanceTool()
    ];
    store.pipe(select(activeTool)).subscribe(this.onActiveToolIdChange.bind(this));
  }

  private onActiveToolIdChange(id: number) {
    const active = this.tools.find(t => t.id === id);
    this._activeToolId.next(id);
    this._activeTool.next(active);
  }
}
