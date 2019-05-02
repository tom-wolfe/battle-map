import { Tool } from './tool';
import { Injectable } from '@angular/core';

@Injectable()
export class DistanceTool implements Tool {
  id = 5;
  title = 'Distance';
  icon = 'fa-ruler-combined';
  settingsComponent = undefined;

  activate() { }
  deactivate() { }
}
