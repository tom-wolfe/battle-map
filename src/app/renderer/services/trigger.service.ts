import { EventEmitter, Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapController, MapGrid } from '@bm/map/services';
import { combineLatest } from 'rxjs';

@Injectable()
export class RenderTrigger {
  public readonly render = new EventEmitter();

  constructor(
    controller: MapController,
    canvas: MapCanvas,
    grid: MapGrid,
    battlefield: MapBattlefield
  ) {
    combineLatest(
      controller.pan$,
      controller.scale$,
      canvas.background$,
      canvas.element$,
      canvas.resize$,
      grid.offset$,
      grid.size$,
      battlefield.creatures$
    ).subscribe(() => this.render.emit());
  }

  public trigger() { this.render.emit(); }
}
