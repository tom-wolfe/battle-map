import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as Components from './components';
import { Toolbox } from './toolbox';
import * as Tools from './tools';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  Components.ToolbarComponent,
  Components.ToolOptionsComponent
];

const TOOLS = [
  Tools.CreatureTool,
  Tools.DistanceTool,
  Tools.MapTool,
  Tools.MoveTool,
  Tools.PaintTool,
  Tools.SpellEffectTool,
  Tools.ZoomTool
];

const TOOL_SETTINGS = [
  Tools.CreatureSettingsComponent,
  Tools.MapSettingsComponent,
  Tools.ZoomSettingsComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ...TOOL_SETTINGS],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [Toolbox, ...TOOLS],
  exports: [...COMPONENTS],
  entryComponents: [...TOOL_SETTINGS]
})
export class ToolboxModule { }
