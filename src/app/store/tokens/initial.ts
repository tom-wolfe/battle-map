import { TokensState } from './state';
import { Size } from '@bm/models';

export const initialState: TokensState = {
  tokens: [
    { id: 0, name: 'Kobold', defaultSize: Size.Small, imageUrl: 'https://vignette.wikia.nocookie.net/forgottenrealms/images/f/f3/Monster_Manual_5e_-_Kobold_-_p195.jpg' }
  ],
  images: {}
};
