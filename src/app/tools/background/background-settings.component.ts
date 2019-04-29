import { Component } from '@angular/core';
import { SetBackgroundImage } from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bm-background-settings',
  templateUrl: './background-settings.component.html'
})
export class BackgroundSettingsComponent {
  constructor(private store: Store<AppState>) { }

  onLoadImageClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.onchange = this.onBackgroundImageChange.bind(this);
    document.body.appendChild(input);
    input.click();
  }

  private onBackgroundImageChange(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    createImageBitmap(file).then(image => {
      this.store.dispatch(new SetBackgroundImage(image));
    });
  }
}
