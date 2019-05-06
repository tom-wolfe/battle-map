export interface EventBindings {
  hammer?: EventBinding;
  element?: EventBinding;
}

export interface EventBinding {
  [key: string]: (e: any) => void;
}
