import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import * as Components from './components';
import { featureName, reducers } from './store/reducer';
import { Toolbox } from './toolbox';
import * as Tools from './tools';

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
  Tools.SelectTool,
  Tools.SpellEffectTool,
  Tools.ZoomTool,
  Tools.CreatureToolSettings
];

const TOOL_SETTINGS = [
  Tools.CreatureSettingsComponent,
  Tools.MapSettingsComponent,
  Tools.ZoomSettingsComponent,
  Tools.CreaturePanelComponent
];

@NgModule({
  declarations: [...COMPONENTS, ...TOOL_SETTINGS],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    StoreModule.forFeature(featureName, reducers)
  ],
  providers: [Toolbox, ...TOOLS],
  exports: [...COMPONENTS],
  entryComponents: [...TOOL_SETTINGS]
})
export class ToolboxModule { }
