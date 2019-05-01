import { GridState } from './grid';
import { MapState } from './map';
import { NavigationState } from './navigation';
import { ToolboxState } from './toolbox';

export interface AppState {
  grid: GridState;
  map: MapState;
  navigation: NavigationState;
  toolbox: ToolboxState;
}
