import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Map from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bm-map',
  template: '<canvas bmMapNavigation #canvas></canvas>',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new Map.SetCanvas(this.canvasEl.nativeElement));
  }
}
