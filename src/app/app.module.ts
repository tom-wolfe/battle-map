import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import * as Components from './components';
import { MapModule } from './map/';
import { reducers } from './store/reducer';
import { ToolsModule } from './tools';

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
    ToolsModule,
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
