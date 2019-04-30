import { Component } from '@angular/core';
import { MapNavigator } from '@bm/map/services';

@Component({
  selector: 'bm-zoom-settings',
  templateUrl: './zoom-settings.component.html'
})
export class ZoomSettingsComponent {
  constructor(private navigator: MapNavigator) { }
  onZoomInClick() { this.navigator.zoomIn(); }
  onZoomOutClick() { this.navigator.zoomOut(); }
  onFitToScreenClick() { this.navigator.fitToScreen(); }
}
