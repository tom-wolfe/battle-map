import { Component } from '@angular/core';

import { SelectTool } from './select';

@Component({
  selector: 'bm-creature-panel',
  templateUrl: './creature-panel.component.html',
  styleUrls: ['./creature-panel.component.scss']
})
export class CreaturePanelComponent {
  constructor(private select: SelectTool) {

  }
}
