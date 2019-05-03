import { ActiveToolboxState } from './active';
import { CreatureToolState } from './creature';
import { SelectToolState } from './select';

export interface ToolboxState {
  active: ActiveToolboxState;
  creature: CreatureToolState;
  select: SelectToolState;
}
