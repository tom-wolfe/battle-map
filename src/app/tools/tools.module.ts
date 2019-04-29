import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentFactory } from '@bm/utils';

import { GridSettingsComponent } from './grid';
import { Tools } from './tools';
import { ZoomSettingsComponent } from './zoom';

@NgModule({
  declarations: [
    GridSettingsComponent,
    ZoomSettingsComponent
  ],
  imports: [CommonModule],
  providers: [ComponentFactory, Tools],
  entryComponents: [GridSettingsComponent, ZoomSettingsComponent]
})
export class ToolsModule { }
