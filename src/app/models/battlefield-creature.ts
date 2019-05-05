import { Creature } from './creature';
import { SizeInfo } from './size';
import { Token } from './token';

export interface BattlefieldCreature extends Creature {
  image: HTMLImageElement;
  token: Token;
  sizeInfo: SizeInfo;
}
