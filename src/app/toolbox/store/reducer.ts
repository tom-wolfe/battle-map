import { activeReducer } from './active';
import { creatureReducer } from './creature';
import { selectReducer } from './select';

export const featureName = 'toolbox';

export const reducers = {
  active: activeReducer,
  creature: creatureReducer,
  select: selectReducer
};
