import { Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapController, MapGrid } from '@bm/map/services';
import { Sizes } from '@bm/models';
import { CreatureRenderData, GridRenderData, ImageRenderData } from '@bm/renderer/models';

const CREATURE_PADDING = 4;
const MIN_TEXT_SIZE = 10;
const DEFAULT_TEXT_SIZE = 14;
const NO_IMAGE: ImageRenderData = { image: undefined, x: 0, y: 0, width: 0, height: 0, draw: false };
const NO_CREATURE: CreatureRenderData = { id: undefined, name: undefined, image: NO_IMAGE, selected: false, text: { size: 16 } };

@Injectable()
export class RenderCore {
  constructor(
    private canvas: MapCanvas,
    private controller: MapController,
    private battlefield: MapBattlefield,
    private mapGrid: MapGrid
  ) { }

  background(): ImageRenderData {
    const image = this.canvas.background;
    if (!image) { return NO_IMAGE; }
    return {
      image,
      x: this.panX(0),
      y: this.panY(0),
      width: this.scaleN(image.width),
      height: this.scaleN(image.height),
      draw: true
    };
  }

  grid(): GridRenderData {
    const size = this.scaleN(this.mapGrid.size);
    const start = {
      x: this.boundCoordinate(this.panX(this.scaleN(this.mapGrid.offset.x) + size)),
      y: this.boundCoordinate(this.panY(this.scaleN(this.mapGrid.offset.y) + size)),
    }
    return { start, size }
  }

  creatures(): CreatureRenderData[] {
    const gridSize = this.scaleN(this.mapGrid.size);
    const padding = this.scaleN(CREATURE_PADDING);
    return this.battlefield.creatures.map(creature => {
      if (!creature.image) { return NO_CREATURE; }

      const size = Sizes.find(s => s.id === creature.size);
      const point = this.mapGrid.pointFromCell(creature.cell);
      const creatureSize = (gridSize * size.scale) - padding * 2;

      const halfSquare = gridSize * Math.max(1, size.scale) / 2;
      const halfCreature = creatureSize / 2;

      return {
        id: creature.id,
        name: creature.name,
        image: {
          image: creature.image,
          x: point.x + halfSquare - halfCreature,
          y: point.y + halfSquare - halfCreature,
          width: creatureSize,
          height: creatureSize,
          draw: true,
        },
        selected: false,
        text: {
          size: Math.max(MIN_TEXT_SIZE, this.scaleN(DEFAULT_TEXT_SIZE))
        }
      };
    });
  }

  private panX(x: number): number { return x + this.controller.pan.x; }
  private panY(y: number): number { return y + this.controller.pan.y; }
  private scaleN(n: number): number { return n * this.controller.scale; }
  private boundCoordinate(ord: number) {
    const gridSize = this.scaleN(this.mapGrid.size);
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord;
  }
}
