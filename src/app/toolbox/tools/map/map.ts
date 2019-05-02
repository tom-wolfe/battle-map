import { Tool } from '@bm/toolbox/tools/tool';

import { MapSettingsComponent } from './map-settings.component';

export class MapTool implements Tool {
  id = 0;
  title = 'Map';
  icon = 'fa-map';
  settingsComponent = MapSettingsComponent;
}
