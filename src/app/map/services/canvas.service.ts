import { EventEmitter, Injectable } from '@angular/core';
import * as Canvas from '@bm/map/store/canvas';
import * as Navigation from '@bm/map/store/navigation';
import { Point } from '@bm/models';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import Hammer from 'hammerjs';
import { Subject } from 'rxjs';

const FIT_PADDING = 20;

@Injectable()
export class MapCanvas {
  public background: HTMLImageElement;
  public element: HTMLCanvasElement;
  public hammer: HammerManager;

  public readonly resize$ = new EventEmitter();

  public readonly background$ = this.store.pipe(select(Canvas.background));
  public readonly element$ = new Subject<HTMLCanvasElement>();

  constructor(private store: Store<AppState>) {
    this.background$.subscribe(b => this.background = b);
    window.addEventListener('resize', this.onWindowResize.bind(this));
    store.pipe(select(Canvas.element)).subscribe(this.onElementChange.bind(this));
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.store.dispatch(new Canvas.SetCanvas(canvas));
  }

  setBackground(image: HTMLImageElement) {
    this.store.dispatch(new Canvas.SetBackground(image));
    this.fitToScreen();
  }

  fitToScreen() {
    let scale = 1;
    let offset = { x: 0, y: 0 };

    if (this.background) {
      const xScale = (this.element.width - FIT_PADDING) / this.background.width;
      const yScale = (this.element.height - FIT_PADDING) / this.background.height;
      scale = Math.min(xScale, yScale);
      offset = this.centerImage(this.background, scale);
    }

    this.store.dispatch(new Navigation.SetScale(scale));
    this.store.dispatch(new Navigation.SetPan(offset));
  }

  private onElementChange(e: HTMLCanvasElement) {
    if (!e) { return; }
    this.element = e;
    this.hammer = new Hammer(this.element);
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.hammer.get('pinch').set({ enable: true });
    this.element$.next(e);
    this.onWindowResize();
  }

  private onWindowResize() {
    this.element.width = this.element.parentElement.clientWidth;
    this.element.height = this.element.parentElement.clientHeight;
    this.resize$.emit();
  }

  private centerImage(image: HTMLImageElement, scale: number): Point {
    return {
      x: this.element.width / 2 - image.width * scale / 2,
      y: this.element.height / 2 - image.height * scale / 2
    };
  }
}
