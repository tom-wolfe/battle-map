import { ImageRenderData } from './image';

export interface CreatureRenderData {
  id: number;
  image: ImageRenderData;
  selected: boolean;
}