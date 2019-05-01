import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MapCanvas } from '../services/canvas.service';

@Component({
  selector: 'bm-map',
  template: '<canvas bmMapNavigation bmTool #canvas></canvas>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;
  constructor(private canvas: MapCanvas) { }
  ngOnInit() { this.canvas.setCanvas(this.canvasEl.nativeElement); }
}
