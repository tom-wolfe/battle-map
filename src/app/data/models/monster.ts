import { Size } from '@bm/models';

export interface Monster {
  name: string;
  size: Size;
  image: {
    url: string;
  }
}