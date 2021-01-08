import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { MapCanvas, MapNavigator, MapTokens } from '@bm/map/services';
// import { MapRenderer } from '@bm/renderer';

@Component({
  selector: 'bm-map',
  template: '<canvas id="map" bmMapNavigation #canvas></canvas>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement> | undefined;

  constructor(
    // private renderer: MapRenderer,
    // private navigator: MapNavigator,
    // private canvas: MapCanvas,
    // private tokens: MapTokens
  ) { }

  ngOnInit() {
    // this.canvas.setCanvas(this.canvasEl.nativeElement);
    // this.tokens.loadTokens();
  }
}
