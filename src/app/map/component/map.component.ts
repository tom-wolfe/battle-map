import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapCanvas, MapNavigator } from '@bm/map/services';
import { MapRenderer } from '@bm/renderer';

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
