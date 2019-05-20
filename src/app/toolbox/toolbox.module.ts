import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import * as Components from './components';
import { featureName, reducers } from './store/reducer';
import { Toolbox } from './toolbox';
import * as Tools from './tools';
import { DialogsModule } from '@bm/dialogs';

const COMPONENTS = [
  Components.ToolbarComponent,
  Components.ToolOptionsComponent
];

const TOOLS = [
  Tools.CreatureTool,
  Tools.CreatureToolSettings,
  Tools.DistanceTool,
  Tools.MapTool,
  Tools.MoveTool,
  Tools.PaintTool,
  Tools.SelectTool,
  Tools.SelectToolSettings,
  Tools.SpellEffectTool,
  Tools.ZoomTool,
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
    BrowserAnimationsModule,
    FormsModule,
    OverlayModule,
    DialogsModule,
    StoreModule.forFeature(featureName, reducers)
  ],
  providers: [Toolbox, ...TOOLS],
  exports: [...COMPONENTS],
  entryComponents: [...TOOL_SETTINGS]
})
export class ToolboxModule { }
