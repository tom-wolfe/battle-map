import { Point } from './point';
import { Size } from './size';

export interface Creature {
  tokenId: number;
  location: Point;
  size: Size;
}
