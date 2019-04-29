import { Component } from '@angular/core';
import { ZoomIn, ZoomOut } from '@bm/store/map';
import { Store } from '@ngrx/store';
import { AppState } from '@bm/store/state';

@Component({
  selector: 'bm-zoom-settings',
  templateUrl: './zoom-settings.component.html'
})
export class ZoomSettingsComponent {
  // gridSize: number;
  
  constructor(private store: Store<AppState>) {
    // this.store.pipe(select(scaleFactor)).subscribe(s => this.scaleFactor = s);
  }

  // onScaleFactorChange(e: Event) {
  //   const input = e.target as HTMLInputElement;
  //   this.store.dispatch(new SetScaleFactor(Number(input.value)));
  // }

  onZoomInClick() { this.store.dispatch(new ZoomIn()); }
  onZoomOutClick() { this.store.dispatch(new ZoomOut()); }
}
