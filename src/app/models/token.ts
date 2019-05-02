import { Size } from './size';

export interface Token {
  id: number;
  name: string;
  defaultSize: Size;
  imageUrl: string;
}