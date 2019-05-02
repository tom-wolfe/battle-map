import { Injectable } from '@angular/core';
import { Tool } from '@bm/toolbox/tools/tool';

@Injectable()
export class SelectTool implements Tool {
  id = 7;
  title = 'Select Object';
  icon = 'fa-mouse-pointer';

  constructor( ) { }

  activate() { }
  deactivate() { }
}
