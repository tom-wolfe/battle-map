import { gridReducer } from './grid';
import { mapReducer } from './map';
import { navigationReducer } from './navigation';

export const reducers = {
  grid: gridReducer,
  map: mapReducer,
  navigation: navigationReducer
};
