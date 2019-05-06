import { Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapController, MapGrid } from '@bm/map/services';
import { Sizes } from '@bm/models';
import { SelectToolSettings } from '@bm/toolbox';
import { combineLatest } from 'rxjs';
import { RenderTrigger } from './trigger.service';

export const CREATURE_PADDING = 4;

@Injectable()
export class MapRenderer {
  private context: CanvasRenderingContext2D;

  constructor(
    private controller: MapController,
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private selected: SelectToolSettings,
    private trigger: RenderTrigger
  ) {
    this.trigger.render.subscribe(this.render.bind(this));
    canvas.element$.subscribe(this.onCanvasChange.bind(this));
  }

  private onCanvasChange(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = 'high';
    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height);
    this.renderBackground();
    this.renderGrid();
    this.renderCreatures();
  }

  private renderBackground() {
    const bg = this.canvas.background;
    if (!bg) { return; }

    this.context.drawImage(bg, this.panX(0), this.panY(0), this.scaleN(bg.width), this.scaleN(bg.height));
  }

  private renderGrid() {
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';

    const gridSize = this.scaleN(this.grid.size);

    const startX = this.boundCoordinate(this.panX(this.scaleN(this.grid.offset.x) + gridSize));
    const startY = this.boundCoordinate(this.panY(this.scaleN(this.grid.offset.y) + gridSize));

    const grid = new Path2D();
    // Vertical lines.
    for (let x = startX; x <= this.canvas.element.width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, this.canvas.element.height);
    }
    // Horizontal lines
    for (let y = startY; y <= this.canvas.element.height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(this.canvas.element.width, y);
    }
    this.context.stroke(grid);
  }

  private renderCreatures() {
    const gridSize = this.scaleN(this.grid.size);
    const padding = this.scaleN(CREATURE_PADDING);
    this.battlefield.creatures.forEach(creature => {
      if (!creature.image) { return; }
      const size = Sizes.find(s => s.id === creature.size);
      const point = this.grid.pointFromCell(creature.cell);
      const creatureSize = (gridSize * size.scale) - padding * 2;

      const halfSquare = gridSize * Math.max(1, size.scale) / 2;
      const halfCreature = creatureSize / 2;

      const drawPoint = {
        x: point.x + halfSquare - halfCreature,
        y: point.y + halfSquare - halfCreature,
      };

      if (this.selected.creatureId === creature.id) {
        this.context.filter = 'drop-shadow(0px 0px 10px white)';
      }
      this.context.drawImage(creature.image, drawPoint.x, drawPoint.y, creatureSize, creatureSize);
      this.context.filter = 'none';
    });
  }

  private panX(x: number) { return x + this.controller.pan.x; }
  private panY(y: number) { return y + this.controller.pan.y; }
  private scaleN(n: number) { return n * this.controller.scale; }

  private boundCoordinate(ord: number) {
    const gridSize = this.scaleN(this.grid.size);
    if (ord > gridSize || ord < 0) {
      ord -= Math.ceil(ord / gridSize) * gridSize;
    }
    return ord;
  }
}
