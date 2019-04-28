import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { MapComponent } from './map';
import { MenuComponent } from './menu';
import { reducers } from './store/reducer';
import { ToolbarComponent } from './toolbar';
import { ToolOptionsComponent } from './tool-options';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent,
    ToolOptionsComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
