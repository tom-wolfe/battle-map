import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapRenderer } from '@bm/map/renderer';
import { MapCanvas, MapNavigator } from '@bm/map/services';

@Component({
  selector: 'bm-map',
  template: '<canvas bmMapNavigation #canvas></canvas>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;
  constructor(
    private renderer: MapRenderer,
    private navigator: MapNavigator,
    private canvas: MapCanvas
  ) { }
  ngOnInit() { this.canvas.setCanvas(this.canvasEl.nativeElement); }
}
