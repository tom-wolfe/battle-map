import { Component, HostListener, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'bm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit() { this.reposition(); }
  @HostListener('window:resize') onResize() { this.reposition(); }

  reposition() {
    const el = this.elRef.nativeElement as HTMLElement;
    const halfBody = window.innerHeight / 2;
    const midPoint = el.clientHeight / 2;
    const top = halfBody - midPoint;
    el.style.top = `${top}px`;
  }
}
