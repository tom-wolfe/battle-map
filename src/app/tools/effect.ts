import { Tool } from './tool';

export class EffectTool implements Tool {
  id = 6;
  title = 'Effect';
  icon = 'mdi-flask';
  settingsComponent = undefined;
  execute() { }
}
