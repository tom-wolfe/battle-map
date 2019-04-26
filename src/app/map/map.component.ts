import { Component, ViewChild, ElementRef, OnChanges, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'bm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gridSize = 80;
  gridOffset = {
    x: 0.5,
    y: 0.5
  };

  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.canvas = this.canvasEl.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.onResize();
  }

  ngOnChanges() { this.onResize(); }

  @HostListener('window:resize') onResize() {
    this.canvas.width = this.elRef.nativeElement.clientWidth;
    this.canvas.height = this.elRef.nativeElement.clientHeight;
    this.render();
  }

  panOffset = { x: 0, y: 0 };

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

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderGrid();
  }

  renderGrid() {
    this.context.strokeStyle = 'rgba(255, 255, 255, 0.1)';

    const startX = this.boundCoordinate(this.gridOffset.x + this.panOffset.x + this.gridSize);
    const startY = this.boundCoordinate(this.gridOffset.y + this.panOffset.y + this.gridSize);

    const grid = new Path2D();
    for (let x = startX; x <= this.canvas.width; x += this.gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.height);
    }
    for (let y = startY; y <= this.canvas.height; y += this.gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.width, y);
    }
    this.context.stroke(grid);
  }

  private boundCoordinate(ord: number) {
    if (ord > this.gridSize || ord < 0) {
      ord -= Math.ceil(ord / this.gridSize) * this.gridSize;
    }
    return ord
  }
}
