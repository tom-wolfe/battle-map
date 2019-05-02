import { Point } from './point';
import { Size } from './size';
import { Token } from './token';

export interface BattlefieldCreature {
  image: ImageBitmap;
  token: Token;
  location: Point;
  size: Size;
}
