import { Injector, Type } from '@angular/core';

export interface Tool {
  id: number;
  title: string;
  icon: string;
  settingsComponent: Type<any>;
  handler?: ToolHandlerConstructor;
}

export interface ToolHandlerConstructor {
  new(injector: Injector): ToolHandler;
}

export interface ToolHandler {
  destroy(): void;
}
