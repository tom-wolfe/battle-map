import { Tool } from './tool';

export class MoveTool implements Tool {
  id = 2;
  title = 'Move';
  icon = 'fa-shoe-prints';
  settingsComponent = undefined;
}
