import { Component, ViewChild, ElementRef, OnChanges, OnInit, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, MapState } from '@bm/store/state';
import * as Map from '@bm/store/map/selectors';

@Component({
  selector: 'bm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  map: MapState;
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

  onMapChange(map: MapState) {
    this.map = map;
    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    this.renderGrid();
  }

  renderBackground() {
    if (!this.map.background) { return; }
    this.context.drawImage(this.map.background, 0, 0);
  }

  renderGrid() {
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

    const startX = this.boundCoordinate(this.gridOffset.x + this.panOffset.x + this.map.gridSize);
    const startY = this.boundCoordinate(this.gridOffset.y + this.panOffset.y + this.map.gridSize);

    const grid = new Path2D();
    for (let x = startX; x <= this.canvas.width; x += this.map.gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.height);
    }
    for (let y = startY; y <= this.canvas.height; y += this.map.gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.width, y);
    }
    this.context.stroke(grid);
  }

  private boundCoordinate(ord: number) {
    if (ord > this.map.gridSize || ord < 0) {
      ord -= Math.ceil(ord / this.map.gridSize) * this.map.gridSize;
    }
    return ord
  }
}
