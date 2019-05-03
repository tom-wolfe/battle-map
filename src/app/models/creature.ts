import { Point } from './point';
import { Size } from './size';

export interface Creature {
  id: number;
  tokenId: number;
  location: Point;
  size: Size;
}
