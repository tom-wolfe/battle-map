import { Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapGrid, MapTokens } from '@bm/map/services';
import { Creature, Size } from '@bm/models';
import { AppState } from '@bm/store/state';
import * as CreatureStore from '@bm/toolbox/store/creature';
import { Tool } from '@bm/toolbox/tools/tool';
import { relativeMouse } from '@bm/utils';
import { Store } from '@ngrx/store';

@Injectable()
export class CreatureTool implements Tool {
  id = 1;
  title = 'Creature';
  icon = 'fa-chess-knight';

  private token: number;
  private size: Size;

  public readonly token$ = this.store.select(CreatureStore.token);
  public readonly size$ = this.store.select(CreatureStore.size);
  public readonly tokens$ = this.tokens.tokens$;

  private onCanvasClick = this.canvasClick.bind(this);

  constructor(
    private store: Store<AppState>,
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private tokens: MapTokens,
  ) {
    this.token$.subscribe(t => this.token = t);
    this.size$.subscribe(s => this.size = s);
  }

  setToken(tokenId: number) {
    const token = this.tokens.tokens.find(t => t.id === tokenId);
    this.store.dispatch(new CreatureStore.SetToken(token.id));
    this.setSize(token.defaultSize);
  }
  setSize(size: Size) { this.store.dispatch(new CreatureStore.SetSize(size)); }

  canvasClick(e: MouseEvent) {
    const point = relativeMouse(e, this.canvas.element);
    const location = this.grid.cellAt(point);
    const creature: Creature = { tokenId: this.token, size: this.size, location };
    this.battlefield.addCreature(creature);
  }

  activate() {
    this.canvas.element.addEventListener('click', this.onCanvasClick);
  }

  deactivate() {
    this.canvas.element.removeEventListener('click', this.onCanvasClick);
  }
}
