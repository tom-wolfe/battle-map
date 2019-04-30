import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Toolbox } from './toolbox';
import * as Tools from './tools';

const COMPONENTS = [
  Tools.BackgroundSettingsComponent,
  Tools.GridSettingsComponent,
  Tools.ZoomSettingsComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  providers: [Toolbox],
  entryComponents: [...COMPONENTS]
})
export class ToolboxModule { }
