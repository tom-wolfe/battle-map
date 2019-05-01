import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolboxModule } from '@bm/toolbox';

import { MapComponent } from './component/map.component';
import * as Directives from './directives';
import * as Services from './services';

const COMPONENTS = [
  MapComponent
];

const DIRECTIVES = [
  Directives.MapNavigationDirective
];

const SERVICES = [
  Services.MapBattlefield,
  Services.MapCanvas,
  Services.MapController,
  Services.MapGrid,
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
