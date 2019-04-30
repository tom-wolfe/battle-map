import { Tool } from '@bm/toolbox/tools/tool';

import { TokenHandler } from './handler';

export class TokenTool implements Tool {
  id = 3;
  title = 'Token';
  icon = 'mdi-chess-knight';
  settingsComponent = undefined;
  handler = TokenHandler;
}
