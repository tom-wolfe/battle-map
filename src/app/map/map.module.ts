import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolboxModule } from '@bm/toolbox';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MapComponent } from './component/map.component';
import * as Directives from './directives';
import * as Services from './services';
import { effects } from './store/effects';
import { featureName, reducers } from './store/reducer';
import { MapRenderer } from './services/renderer.service';

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
  Services.MapTokens,
  MapRenderer,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    ToolboxModule,
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature(effects),
  ],
  exports: [...COMPONENTS],
  providers: [...SERVICES],
  entryComponents: [...COMPONENTS]
})
export class MapModule { }
