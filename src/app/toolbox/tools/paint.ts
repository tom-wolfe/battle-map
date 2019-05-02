import { Tool } from './tool';
import { Injectable } from '@angular/core';

@Injectable()
export class PaintTool implements Tool {
  id = 4;
  title = 'Paint';
  icon = 'fa-paint-brush';
  settingsComponent = undefined;

  activate() { }
  deactivate() { }
}
