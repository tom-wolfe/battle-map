import { Point } from './point';

export interface SaveData {
  backgroundImage: string;
  grid: {
    size: number;
    offset: Point;
  }
}
