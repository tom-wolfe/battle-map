import { battlefieldReducer } from './battlefield';
import { canvasReducer } from './canvas';
import { gridReducer } from './grid';
import { navigationReducer } from './navigation';
import { tokensReducer } from './tokens';
import { toolboxReducer } from './toolbox';

export const reducers = {
  battlefield: battlefieldReducer,
  canvas: canvasReducer,
  grid: gridReducer,
  navigation: navigationReducer,
  tokens: tokensReducer,
  toolbox: toolboxReducer
};
