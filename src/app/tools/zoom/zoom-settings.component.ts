import { Component } from '@angular/core';
import { Map } from '@bm/map/services';

@Component({
  selector: 'bm-zoom-settings',
  templateUrl: './zoom-settings.component.html'
})
export class ZoomSettingsComponent {
  constructor(private map: Map) { }
  onZoomInClick() { this.map.zoomIn(); }
  onZoomOutClick() { this.map.zoomOut(); }
  onFitToScreenClick() { this.map.fitToScreen(); }
}
