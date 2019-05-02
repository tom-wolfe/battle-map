import { Tool } from './tool';

export class DistanceTool implements Tool {
  id = 5;
  title = 'Distance';
  icon = 'fa-ruler-combined';
  settingsComponent = undefined;
}
