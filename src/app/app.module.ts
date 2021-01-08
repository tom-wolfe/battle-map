import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@bm/store';

import * as Components from '@bm/navigation';
import { MapModule } from '@bm/map';

@NgModule({
  declarations: [
    AppComponent,
    Components.HeaderComponent,
    Components.MenuComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
