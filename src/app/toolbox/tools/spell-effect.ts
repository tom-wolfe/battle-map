import { Tool } from './tool';
import { Injectable } from '@angular/core';

@Injectable()
export class SpellEffectTool implements Tool {
  id = 3;
  title = 'Spell Effect';
  icon = 'fa-flask';
  settingsComponent = undefined;

  activate() { }
  deactivate() { }
}
