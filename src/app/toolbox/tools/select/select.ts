import { Injectable } from '@angular/core';
import { Tool } from '@bm/toolbox/tools/tool';
import { MapController, MapCanvas } from '@bm/map/services';

@Injectable()
export class SelectTool implements Tool {
  id = 7;
  title = 'Select Object';
  icon = 'fa-mouse-pointer';

  constructor(
    private canvas: MapCanvas,
    private controller: MapController
  ) { }

  activate() {
    this.controller.setEnabled(false);
  }

  deactivate() {
    this.controller.setEnabled(true);
  }
}
