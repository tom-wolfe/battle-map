import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map } from '@bm/map/services';

@Component({
  selector: 'bm-map',
  template: '<canvas bmMapNavigation bmTool #canvas></canvas>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;
  constructor(private map: Map) { }
  ngOnInit() { this.map.setCanvas(this.canvasEl.nativeElement); }
}
