import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as Components from './components';
import * as Directives from './directives';
import { Toolbox } from './toolbox';
import * as Tools from './tools';

const COMPONENTS = [
  Components.ToolbarComponent,
  Components.ToolOptionsComponent
];

const DIRECTIVES = [
  Directives.ToolDirective
];

const TOOLS = [
  Tools.MapSettingsComponent,
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
