import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapCanvas } from '@bm/map/services';
import { MapRenderer } from '../services/renderer.service';

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
