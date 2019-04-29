import { SetBackgroundImage } from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { Store } from '@ngrx/store';

import { Tool } from './tool';

export class BackgroundImageTool implements Tool {
  id = 2;
  title = 'Background Image';
  icon = 'mdi-image';
  settingsComponent = undefined;

  constructor(private store: Store<AppState>) { }

  execute() {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.onchange = this.onBackgroundImageChange.bind(this);
    document.body.appendChild(input);
    input.click();
  }

  private onBackgroundImageChange(e: Event) {
    const file = (e.srcElement as HTMLInputElement).files[0];
    createImageBitmap(file).then(image => {
      this.store.dispatch(new SetBackgroundImage(image));
    });
  }
}