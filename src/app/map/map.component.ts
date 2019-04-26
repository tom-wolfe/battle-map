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
    this.render();
  }

  ngOnChanges() { this.render(); }
  @HostListener('window:resize') onResize() { this.render(); }

  render() {
    this.updateSize();
    this.renderGrid();
  }

  updateSize() {
    this.canvas.width = this.elRef.nativeElement.clientWidth;
    this.canvas.height = this.elRef.nativeElement.clientHeight;
  }

  renderGrid() {
    this.context.lineWidth = 1;
    this.context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    const grid = new Path2D();
    for (let x = this.gridOffset.x + this.gridSize; x <= this.canvas.width; x += this.gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.height);
    }

    for (let y = this.gridOffset.y + this.gridSize; y <= this.canvas.height; y += this.gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.width, y);
    }
    this.context.stroke(grid);
  }
}
