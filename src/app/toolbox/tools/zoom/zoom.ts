import { Tool } from '@bm/toolbox/tools/tool';

import { ZoomSettingsComponent } from './zoom-settings.component';

export class ZoomTool implements Tool {
  id = 8;
  title = 'Zoom';
  icon = 'fa-search';
  settingsComponent = ZoomSettingsComponent;
}
