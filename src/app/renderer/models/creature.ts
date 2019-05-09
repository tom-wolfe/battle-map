import { ImageRenderData } from './image';
import { TextRenderData } from './text';

export interface CreatureRenderData {
  id: number;
  name: string;
  image: ImageRenderData;
  selected: boolean;
  text: TextRenderData;
}