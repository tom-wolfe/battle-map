import { NgModule } from '@angular/core';

import * as Services from './services';

const SERVICES = [
  Services.MapRenderer,
  Services.RenderCore,
  Services.RenderData,
  Services.RenderMiddleware,
  Services.RenderTrigger,
];

@NgModule({
  declarations: [],
  imports: [],
  providers: [...SERVICES],
})
export class RendererModule { }
