import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import * as Components from './components';
import { MapModule } from './map/';
import { reducers } from './store/reducer';
import { ToolboxModule } from './toolbox';

@NgModule({
  declarations: [
    AppComponent,
    Components.MenuComponent,
    Components.ToolbarComponent,
    Components.ToolOptionsComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    ToolboxModule,
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
