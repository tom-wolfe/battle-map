import { BattlefieldState } from './battlefield';
import { CanvasState } from './canvas';
import { GridState } from './grid';
import { NavigationState } from './navigation';
import { TokensState } from './tokens';

export interface MapState {
  battlefield: BattlefieldState;
  canvas: CanvasState;
  grid: GridState;
  navigation: NavigationState;
  tokens: TokensState;
}
