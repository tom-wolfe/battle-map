import { Component } from '@angular/core';
import { ZoomIn, ZoomOut, FitToScreen } from '@bm/store/map';
import { Store } from '@ngrx/store';
import { AppState } from '@bm/store/state';

@Component({
  selector: 'bm-zoom-settings',
  templateUrl: './zoom-settings.component.html'
})
export class ZoomSettingsComponent {
  constructor(private store: Store<AppState>) { }

  onZoomInClick() { this.store.dispatch(new ZoomIn({ x: 0, y: 0 })); }
  onZoomOutClick() { this.store.dispatch(new ZoomOut({ x: 0, y: 0 })); }
  onFitToScreenClick() { this.store.dispatch(new FitToScreen()); }
}
