import { Tool } from './tool';

export class DistanceTool implements Tool {
  id = 7;
  title = 'Distance';
  icon = 'mdi-ruler';
  settingsComponent = undefined;
  execute() { }
}