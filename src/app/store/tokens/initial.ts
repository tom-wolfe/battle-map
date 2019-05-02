import { TokensState } from './state';
import { Size } from '@bm/models';

export const initialState: TokensState = {
  tokens: [
    {
      id: 0,
      name: 'Goblin',
      defaultSize: Size.Small,
      imageUrl: 'assets/images/tokens/Goblin.png'
    }
  ],
  images: {}
};
