import { MapState } from '@bm/map/store/state';
import { ToolboxState } from '@bm/toolbox/store/state';

export interface AppState {
  map: MapState;
  toolbox: ToolboxState;
}
