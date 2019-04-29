import { Component, ElementRef, HostListener, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as Map from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { Point } from '@bm/models';

@Component({
  selector: 'bm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  map: Map.MapState;
  panOffset: Point = { x: 0, y: 0 };

  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;

  constructor(private elRef: ElementRef, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new Map.SetCanvas(this.canvasEl.nativeElement));
    this.store.pipe(select(Map.state)).subscribe(this.onMapChange.bind(this));
    this.onResize();
  }

  ngOnChanges() { this.onResize(); }

  @HostListener('window:resize') onResize() {
    this.map.canvas.width = this.elRef.nativeElement.clientWidth;
    this.map.canvas.height = this.elRef.nativeElement.clientHeight;
    this.render();
  }

  @HostListener('panmove', ['$event']) onPanMove(e: any) {
    this.panOffset = { x: e.deltaX, y: e.deltaY };
    this.render();
  }

  @HostListener('panend', ['$event']) onPanEnd(e: any) {
    const offset = { ...this.panOffset };
    this.panOffset = { x: 0, y: 0 };
    this.store.dispatch(new Map.Pan(offset));
  }

  @HostListener('wheel', ['$event']) onwheel(e: WheelEvent) {
    this.store.dispatch(e.deltaY > 0 ? new Map.ZoomOut() : new Map.ZoomIn());
  }

  onMapChange(map: Map.MapState) {
    this.map = map;
    this.render();
  }

  render() {
    this.map.context.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height);
    this.renderBackground();
    this.renderGrid();
  }

  renderBackground() {
    const bg = this.map.backgroundImage;
    if (!bg) { return; }
    this.map.context.drawImage(bg, this.offsetX(0), this.offsetY(0), this.scale(bg.width), this.scale(bg.height));
  }

  renderGrid() {
    this.map.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

    const gridSize = this.scale(this.map.grid.size);

    const startX = this.boundCoordinate(this.offsetX(this.scale(this.map.grid.offset.x) + gridSize));
    const startY = this.boundCoordinate(this.offsetY(this.scale(this.map.grid.offset.y) + gridSize));

    const grid = new Path2D();
    for (let x = startX; x <= this.map.canvas.width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.map.canvas.height);
    }
    for (let y = startY; y <= this.map.canvas.height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.map.canvas.width, y);
    }
    this.map.context.stroke(grid);
  }

  private offsetX(x: number) { return x + this.map.panOffset.x + this.panOffset.x; }
  private offsetY(y: number) { return y + this.map.panOffset.y + this.panOffset.y; }
  private scale(n: number) { return n * this.map.scaleFactor; }

  private boundCoordinate(ord: number) {
    const gridSize = this.scale(this.map.grid.size);
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord;
  }
}
