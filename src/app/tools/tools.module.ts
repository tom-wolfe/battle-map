import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentFactory } from '@bm/utils';

import { BackgroundSettingsComponent } from './background';
import { GridSettingsComponent } from './grid';
import { Tools } from './tools';
import { ZoomSettingsComponent } from './zoom';

const COMPONENTS = [
  BackgroundSettingsComponent,
  GridSettingsComponent,
  ZoomSettingsComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule],
  providers: [ComponentFactory, Tools],
  entryComponents: [...COMPONENTS]
})
export class ToolsModule { }
