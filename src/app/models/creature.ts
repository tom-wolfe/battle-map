import { Point } from './point';
import { Size } from './size';

export interface Creature {
  id: number;
  tokenId: number;
  cell: Point;
  size: Size;
}
