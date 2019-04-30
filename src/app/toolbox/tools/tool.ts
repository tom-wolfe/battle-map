import { Type } from '@angular/core';

export interface Tool {
  id: number;
  title: string;
  icon: string;
  settingsComponent: Type<any>;
  handler?: ToolHandlerConstructor;
}

export interface ToolHandlerConstructor {
  new(): ToolHandler; // TODO: Add required params.
}

export interface ToolHandler {
  // TODO: Populate with events.
}
