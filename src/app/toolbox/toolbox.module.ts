import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Toolbox } from './toolbox';
import * as Tools from './tools';
import * as Components from './components';
import * as Directives from './directives';

const COMPONENTS = [
  Components.ToolbarComponent,
  Components.ToolOptionsComponent
];

const DIRECTIVES = [
  Directives.ToolDirective
];

const TOOLS = [
  Tools.BackgroundSettingsComponent,
  Tools.GridSettingsComponent,
  Tools.ZoomSettingsComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ...TOOLS, ...DIRECTIVES],
  imports: [CommonModule],
  providers: [Toolbox],
  exports: [...COMPONENTS, ...DIRECTIVES],
  entryComponents: [...TOOLS]
})
export class ToolboxModule { }
