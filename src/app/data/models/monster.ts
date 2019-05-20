import { Size } from '@bm/models';

export interface Monster {
  name: string;
  size: Size;
  type: string;
  environments: string[];
  tags: string[];
  image: {
    url: string;
  }
}