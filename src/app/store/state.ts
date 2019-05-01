import { CanvasState } from './canvas';
import { GridState } from './grid';
import { MapState } from './map';
import { NavigationState } from './navigation';
import { ToolboxState } from './toolbox';

export interface AppState {
  canvas: CanvasState;
  grid: GridState;
  map: MapState;
  navigation: NavigationState;
  toolbox: ToolboxState;
}
