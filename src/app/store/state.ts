import { GridState } from './grid';
import { MapState } from './map';
import { NavigationState } from './navigation';

export interface AppState {
  grid: GridState;
  map: MapState;
  navigation: NavigationState
}
