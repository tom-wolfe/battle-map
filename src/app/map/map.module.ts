import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolboxModule } from '@bm/toolbox';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MapComponent } from './component/map.component';
import * as Services from './services';
import * as Renderer from './renderer';
import { effects } from './store/effects';
import { featureName, reducers } from './store/reducer';

const COMPONENTS = [
  MapComponent
];

const SERVICES = [
  Services.MapBattlefield,
  Services.MapCanvas,
  Services.MapController,
  Services.MapGrid,
  Services.MapNavigator,
  Services.MapTokens,
  Renderer.MapRenderer,
];

@NgModule({
  declarations: [...COMPONENTS],
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
