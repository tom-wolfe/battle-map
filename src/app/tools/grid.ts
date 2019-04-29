import { Tool } from './tool';

export class GridTool implements Tool {
  id = 1;
  title = 'Grid';
  icon = 'mdi-grid';
  settingsComponent = undefined;
  execute() { }
}
