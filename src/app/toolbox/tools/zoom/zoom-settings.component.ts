import { Component } from '@angular/core';
import { MapController } from '@bm/map/services';

@Component({
  selector: 'bm-zoom-settings',
  templateUrl: './zoom-settings.component.html'
})
export class ZoomSettingsComponent {
  constructor(private controller: MapController) { }
  onZoomInClick() { this.controller.zoomIn(); }
  onZoomOutClick() { this.controller.zoomOut(); }
  onFitToScreenClick() { this.controller.fitToScreen(); }
}
