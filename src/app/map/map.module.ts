import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapComponent } from './component/map.component';
import { Map, MapRenderer, MapNavigationDirective } from './services';

const COMPONENTS = [
  MapComponent
];

const DIRECTIVES = [
  MapNavigationDirective
];

const SERVICES = [
  Map,
  MapRenderer
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [CommonModule],
  exports: [...COMPONENTS],
  providers: [...SERVICES],
  entryComponents: [...COMPONENTS]
})
export class MapModule { }
