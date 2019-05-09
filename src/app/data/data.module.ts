import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import * as Services from './services';
import { DND_BASE_URL } from './tokens';

const SERVICES = [
  Services.Monsters,
];

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: DND_BASE_URL, useValue: 'https://twolfe.co.uk/dnd/' },
    ...SERVICES,
  ],
})
export class DataModule { }
