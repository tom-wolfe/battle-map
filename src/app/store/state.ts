import { CanvasState } from './canvas';
import { GridState } from './grid';
import { NavigationState } from './navigation';
import { ToolboxState } from './toolbox';

export interface AppState {
  canvas: CanvasState;
  grid: GridState;
  navigation: NavigationState;
  toolbox: ToolboxState;
}
