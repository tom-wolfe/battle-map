import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { SetActiveTool } from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { Tool, Tools } from '@bm/tools';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {
  activeTool: Tool;
  tools: Tool[];

  constructor(private elRef: ElementRef, tools: Tools, private store: Store<AppState>) {
    this.tools = tools.tools;
    tools.activeTool.subscribe(t => this.activeTool = t);
  }

  @HostListener('window:resize') onResize() { this.reposition(); }

  ngAfterViewInit(): void { this.reposition(); }

  reposition() {
    const el = this.elRef.nativeElement as HTMLElement;
    const halfBody = window.innerHeight / 2;
    const midPoint = el.clientHeight / 2;
    const top = halfBody - midPoint;
    el.style.top = `${top}px`;
  }

  onToolClick(tool: Tool) {
    this.store.dispatch(new SetActiveTool(tool.id));
    tool.execute();
  }
}
