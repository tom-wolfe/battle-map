import { ActiveToolboxState } from './active';
import { CreatureToolState } from './creature';

export interface ToolboxState {
  active: ActiveToolboxState;
  creature: CreatureToolState;
}
