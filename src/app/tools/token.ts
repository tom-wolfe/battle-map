import { Tool } from './tool';

export class TokenTool implements Tool {
  id = 3;
  title = 'Token';
  icon = 'mdi-chess-knight';
  settingsComponent = undefined;
  execute() { }
}
