import { TokensState } from './state';
import { Size } from '@bm/models';

export const initialState: TokensState = {
  tokens: [
    {
      id: 0,
      name: 'Goblin',
      defaultSize: Size.Small,
      imageUrl: 'assets/images/tokens/Goblin.png'
    },
    {
      id: 1,
      name: 'Adult Green Dragon',
      defaultSize: Size.Huge,
      imageUrl: 'assets/images/tokens/AdultGreenDragon.png'
    }
  ],
  images: {}
};
