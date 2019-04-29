import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { Tool, Tools } from '@bm/tools';

@Component({
  selector: 'bm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {
  tools: Tool[];

  constructor(private elRef: ElementRef, tools: Tools) {
    this.tools = tools.tools;
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
    tool.execute();
  }
}
