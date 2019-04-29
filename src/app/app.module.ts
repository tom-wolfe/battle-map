import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import * as Components from './components';
import { reducers } from './store/reducer';
import { Tools } from './tools';

@NgModule({
  declarations: [
    AppComponent,
    Components.MenuComponent,
    Components.ToolbarComponent,
    Components.ToolOptionsComponent,
    Components.MapComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [Tools],
  bootstrap: [AppComponent]
})
export class AppModule { }
