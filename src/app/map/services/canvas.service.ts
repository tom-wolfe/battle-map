import { Injectable } from '@angular/core';
import * as Canvas from '@bm/store/canvas';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

@Injectable()
export class MapCanvas {
  public element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public readonly element$ = this.store.pipe(select(Canvas.element));
  public readonly context$ = this.store.pipe(select(Canvas.context));

  constructor(private store: Store<AppState>) {
    this.element$.subscribe(e => this.element = e);
    this.context$.subscribe(c => this.context = c);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.store.dispatch(new Canvas.SetCanvas(canvas));
  }
}
