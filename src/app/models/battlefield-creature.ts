import { Creature } from './creature';
import { Token } from './token';

export interface BattlefieldCreature extends Creature {
  image: ImageBitmap;
  token: Token;
}
