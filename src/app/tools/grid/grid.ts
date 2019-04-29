import { Tool } from '@bm/tools/tool';

import { GridSettingsComponent } from './grid-settings.component';

export class GridTool implements Tool {
  id = 1;
  title = 'Grid';
  icon = 'mdi-grid';
  settingsComponent = GridSettingsComponent;
  execute() { }
}
