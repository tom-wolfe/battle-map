import { Size } from './size';

export interface Token {
  id: number;
  name: string;
  type: string;
  environments: string[];
  tags: string[];
  defaultSize: Size;
  imageUrl: string;
}

export interface TokenGroup {
  name: string;
  tokens: Token[];
}
