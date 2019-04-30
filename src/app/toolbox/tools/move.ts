import { Tool } from './tool';

export class MoveTool implements Tool {
  id = 4;
  title = 'Move';
  icon = 'mdi-cursor-move';
  settingsComponent = undefined;
}
