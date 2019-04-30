import { Tool } from '@bm/tools/tool';

import { ZoomSettingsComponent } from './zoom-settings.component';

export class ZoomTool implements Tool {
  id = 8;
  title = 'Zoom';
  icon = 'mdi-magnify';
  settingsComponent = ZoomSettingsComponent;
}
