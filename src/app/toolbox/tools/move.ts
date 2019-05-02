import { Tool } from './tool';
import { Injectable } from '@angular/core';

@Injectable()
export class MoveTool implements Tool {
  id = 2;
  title = 'Move';
  icon = 'fa-shoe-prints';
  settingsComponent = undefined;

  activate() { }
  deactivate() { }
}
