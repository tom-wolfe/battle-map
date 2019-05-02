import { Tool } from '@bm/toolbox/tools/tool';

import { ZoomSettingsComponent } from './zoom-settings.component';
import { Injectable } from '@angular/core';

@Injectable()
export class ZoomTool implements Tool {
  id = 6;
  title = 'Zoom';
  icon = 'fa-search';
  settingsComponent = ZoomSettingsComponent;

  activate() { }
  deactivate() { }
}
