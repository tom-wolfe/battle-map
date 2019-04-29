import { Component, ElementRef, HostListener, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as Map from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'bm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  map: Map.MapState;
  panOffset = { x: 0, y: 0 };
  gridOffset = { x: 0.5, y: 0.5 };

  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;

  constructor(private elRef: ElementRef, private store: Store<AppState>) { }

  ngOnInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.store.pipe(select(Map.state)).subscribe(this.onMapChange.bind(this));
    this.onResize();
  }

  ngOnChanges() { this.onResize(); }

  @HostListener('window:resize') onResize() {
    this.canvas.width = this.elRef.nativeElement.clientWidth;
    this.canvas.height = this.elRef.nativeElement.clientHeight;
    this.render();
  }

  @HostListener('panmove', ['$event']) onPanMove(e: any) {
    this.panOffset = {
      x: e.deltaX,
      y: e.deltaY
    };
    this.render();
  }

  @HostListener('panend', ['$event']) onPanEnd(e: any) {
    this.gridOffset.x += this.panOffset.x;
    this.gridOffset.y += this.panOffset.y;
  }

  @HostListener('wheel', ['$event']) onwheel(e: WheelEvent) {
    this.store.dispatch(e.deltaY > 0 ? new Map.ZoomOut() : new Map.ZoomIn());
  }

  onMapChange(map: Map.MapState) {
    this.map = map;
    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    this.renderGrid();
  }

  renderBackground() {
    const bg = this.map.background;
    if (!bg) { return; }
    this.context.drawImage(bg, this.offsetX(0), this.offsetY(0), bg.width * this.map.scaleFactor, bg.height * this.map.scaleFactor);
  }

  offsetX(x: number) { return x + this.gridOffset.x + this.panOffset.x; }
  offsetY(y: number) { return y + this.gridOffset.y + this.panOffset.y; }

  renderGrid() {
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

    const gridSize = this.map.gridSize * this.map.scaleFactor;

    const startX = this.boundCoordinate(this.offsetX(gridSize));
    const startY = this.boundCoordinate(this.offsetY(gridSize));

    const grid = new Path2D();
    for (let x = startX; x <= this.canvas.width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.height);
    }
    for (let y = startY; y <= this.canvas.height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.width, y);
    }
    this.context.stroke(grid);
  }

  private boundCoordinate(ord: number) {
    const gridSize = this.map.gridSize * this.map.scaleFactor;
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord
  }
}
