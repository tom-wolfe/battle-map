import { Tool } from './tool';

export class PaintTool implements Tool {
  id = 5;
  title = 'Paint';
  icon = 'mdi-brush';
  settingsComponent = undefined;
  execute() { }
}
