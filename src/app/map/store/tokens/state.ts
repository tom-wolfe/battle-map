import { Token } from '@bm/models';

export interface TokensState {
  tokens: Token[];
  images: { [key: string]: HTMLImageElement };
}
