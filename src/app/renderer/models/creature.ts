import { ImageRenderData } from './image';

export interface CreatureRenderData {
  id: number;
  name: string;
  image: ImageRenderData;
  selected: boolean;
}