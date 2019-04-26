export interface AppState {
  map: MapState;
}

export interface MapState {
  gridSize: number;
  background: ImageBitmap;
}