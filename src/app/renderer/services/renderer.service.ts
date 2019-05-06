import { Injectable } from '@angular/core';
import { MapCanvas } from '@bm/map/services';
import { ImageRenderData } from '@bm/renderer/models';

import { RenderData } from './data.service';
import { RenderTrigger } from './trigger.service';

export const CREATURE_PADDING = 4;

@Injectable()
export class MapRenderer {
  private context: CanvasRenderingContext2D;

  constructor(
    private canvas: MapCanvas,
    private trigger: RenderTrigger,
    private data: RenderData
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
    const background = this.data.background();
    if (!background.draw) { return; }
    this.drawImage(background);
  }

  private renderGrid() {
    const grid = this.data.grid();
    this.context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    const path = new Path2D();
    for (let x = grid.start.x; x <= this.canvas.element.width; x += grid.size) {
      path.moveTo(x, 0);
      path.lineTo(x, this.canvas.element.height);
    }
    for (let y = grid.start.y; y <= this.canvas.element.height; y += grid.size) {
      path.moveTo(0, y);
      path.lineTo(this.canvas.element.width, y);
    }
    this.context.stroke(path);
  }

  private renderCreatures() {
    const creatureData = this.data.creatures();
    creatureData.forEach(creature => {
      if (!creature.image.draw) { return; }
      if (creature.selected) this.context.filter = 'drop-shadow(0px 0px 10px white)';
      this.drawImage(creature.image);
      this.context.filter = 'none';
    });

    creatureData.forEach(creature => {
      const x = creature.image.x + creature.image.width / 2;
      const y = creature.image.y + creature.image.height - 2;
      this.drawText(creature.name, x, y, creature.image.width);
    });
  }

  private drawImage(data: ImageRenderData) {
    this.context.drawImage(data.image, data.x, data.y, data.width, data.height);
  }

  private drawText(text: string, x: number, y: number, maxWidth: number) {
    this.context.fillStyle = 'white';
    this.context.textAlign = 'center';
    this.context.font = `bold 16px 'Source Sans Pro'`;
    
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';
    this.context.strokeText(text, x, y, maxWidth);

    this.context.fillStyle = 'white';
    this.context.fillText(text, x, y, maxWidth);
    this.context.lineWidth = 1;
  }
}
