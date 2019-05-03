import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapCanvas, MapRenderer } from '@bm/map/services';

@Component({
  selector: 'bm-map',
  template: '<canvas bmMapNavigation #canvas></canvas>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;
  constructor(_: MapRenderer, private canvas: MapCanvas) { }
  ngOnInit() { this.canvas.setCanvas(this.canvasEl.nativeElement); }
}
