import { Point } from './point';

export interface SaveData {
  background: string;
  grid: {
    size: number;
    offset: Point;
  };
}
