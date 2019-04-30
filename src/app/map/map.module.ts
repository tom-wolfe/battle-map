import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapComponent } from './component/map.component';
import * as Services from './services';
import * as Directives from './directives';
import { ToolboxModule } from '@bm/toolbox';

const COMPONENTS = [
  MapComponent
];

const DIRECTIVES = [
  Directives.MapNavigationDirective
];

const SERVICES = [
  Services.Map,
  Services.MapNavigator,
  Services.MapRenderer
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [CommonModule, ToolboxModule],
  exports: [...COMPONENTS],
  providers: [...SERVICES],
  entryComponents: [...COMPONENTS]
})
export class MapModule { }
