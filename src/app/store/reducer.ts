import { canvasReducer } from './canvas';
import { gridReducer } from './grid';
import { mapReducer } from './map';
import { navigationReducer } from './navigation';
import { toolboxReducer } from './toolbox';

export const reducers = {
  canvas: canvasReducer,
  grid: gridReducer,
  map: mapReducer,
  navigation: navigationReducer,
  toolbox: toolboxReducer
};
