import { canvasReducer } from './canvas';
import { gridReducer } from './grid';
import { navigationReducer } from './navigation';
import { toolboxReducer } from './toolbox';

export const reducers = {
  canvas: canvasReducer,
  grid: gridReducer,
  navigation: navigationReducer,
  toolbox: toolboxReducer
};
