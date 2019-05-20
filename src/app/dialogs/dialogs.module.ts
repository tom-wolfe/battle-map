import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Dialogs } from './dialogs.service';
import { TokenDialogComponent } from './token-dialog/token-dialog.component';

const COMPONENTS = [
  TokenDialogComponent
];

const SERVICES = [
  Dialogs
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [...SERVICES],
  exports: [...COMPONENTS],
  entryComponents: [...COMPONENTS]
})
export class DialogsModule { }
