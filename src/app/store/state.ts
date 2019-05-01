import { MapState } from './map/state';
import { NavigationState } from './navigation';

export interface AppState {
  map: MapState;
  navigation: NavigationState
}
