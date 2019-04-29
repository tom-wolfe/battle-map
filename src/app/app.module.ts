import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import * as Components from './components';
import { reducers } from './store/reducer';
import { GridSettingsComponent, Tools } from './tools';
import { ComponentFactory } from './utils';

@NgModule({
  declarations: [
    AppComponent,
    Components.MenuComponent,
    Components.ToolbarComponent,
    Components.ToolOptionsComponent,
    Components.MapComponent,
    GridSettingsComponent 
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [ComponentFactory, Tools],
  bootstrap: [AppComponent],
  entryComponents: [GridSettingsComponent]
})
export class AppModule { }
