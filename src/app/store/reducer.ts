import { mapReducer } from './map';
import { navigationReducer } from './navigation';

export const reducers = {
  map: mapReducer,
  navigation: navigationReducer
};
