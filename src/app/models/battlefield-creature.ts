import { Point } from './point';
import { Token } from './token';

export interface BattlefieldCreature {
  image: ImageBitmap;
  token: Token;
  location: Point;
}
