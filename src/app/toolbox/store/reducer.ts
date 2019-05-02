import { activeReducer } from './active';
import { creatureReducer } from './creature';

export const featureName = 'toolbox';

export const reducers = {
  active: activeReducer,
  creature: creatureReducer
};
