import { Tool } from '@bm/toolbox/tools/tool';

import { CreatureSettingsComponent } from './creature-settings.component';
import { CreatureHandler } from './handler';

export class CreatureTool implements Tool {
  id = 1;
  title = 'Creature';
  icon = 'fa-chess-knight';
  settingsComponent = CreatureSettingsComponent;
  handler = CreatureHandler;
}
