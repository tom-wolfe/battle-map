import { Tool } from '@bm/toolbox/tools/tool';

import { BackgroundSettingsComponent } from './background-settings.component';

export class BackgroundImageTool implements Tool {
  id = 2;
  title = 'Background Image';
  icon = 'mdi-image';
  settingsComponent = BackgroundSettingsComponent;
}
