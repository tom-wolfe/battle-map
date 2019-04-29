import { Injectable } from '@angular/core';
import { AppState } from '@bm/store/state';
import { Store } from '@ngrx/store';

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
  }
}
