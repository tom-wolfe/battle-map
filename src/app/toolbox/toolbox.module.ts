import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Toolbox } from './toolbox';
import * as Tools from './tools';
import * as Components from './components';

const COMPONENTS = [
  Components.ToolbarComponent,
  Components.ToolOptionsComponent
];

const TOOLS = [
  Tools.BackgroundSettingsComponent,
  Tools.GridSettingsComponent,
  Tools.ZoomSettingsComponent,
]

@NgModule({
  declarations: [...COMPONENTS, ...TOOLS],
  imports: [CommonModule],
  providers: [Toolbox],
  exports: [...COMPONENTS],
  entryComponents: [...TOOLS]
})
export class ToolboxModule { }
