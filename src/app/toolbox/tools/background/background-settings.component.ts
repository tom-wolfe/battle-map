import { Component } from '@angular/core';
import { Map } from '@bm/map/services';

@Component({
  selector: 'bm-background-settings',
  templateUrl: './background-settings.component.html'
})
export class BackgroundSettingsComponent {
  constructor(private map: Map) { }

  onLoadImageClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.onchange = this.onBackgroundChange.bind(this);
    document.body.appendChild(input);
    input.click();
  }

  private onBackgroundChange(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    createImageBitmap(file).then(image => this.map.setBackground(image));
  }
}