import { Injectable } from '@angular/core';
import * as Canvas from '@bm/store/canvas';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

@Injectable()
export class MapCanvas {
  public background: ImageBitmap;
  public context: CanvasRenderingContext2D;
  public element: HTMLCanvasElement;

  public readonly background$ = this.store.pipe(select(Canvas.background));
  public readonly context$ = this.store.pipe(select(Canvas.context));
  public readonly element$ = this.store.pipe(select(Canvas.element));

  constructor(private store: Store<AppState>) {
    this.background$.subscribe(b => this.background = b);
    this.context$.subscribe(c => this.context = c);
    this.element$.subscribe(e => this.element = e);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.store.dispatch(new Canvas.SetCanvas(canvas));
  }

  setBackground(image: ImageBitmap) {
    this.store.dispatch(new Canvas.SetBackground(image));
  }
}
