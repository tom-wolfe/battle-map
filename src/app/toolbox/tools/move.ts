import { Tool } from './tool';

export class MoveTool implements Tool {
  id = 4;
  title = 'Move';
  icon = 'fa-shoe-prints';
  settingsComponent = undefined;
}
