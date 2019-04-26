import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

interface ToolbarItem {
  title: string;
  icon: string;
  execute: () => void;
}

@Component({
  selector: 'bm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewInit {
  toolbarItems: ToolbarItem[] = [
    { title: 'Grid', icon: 'mdi-grid', execute: () => { } },
    { title: 'Background Image', icon: 'mdi-image', execute: this.onBackgroundImageClicked },
    { title: 'Tokens', icon: 'mdi-chess-knight', execute: () => { } },
    { title: 'Move', icon: 'mdi-cursor-move', execute: () => { } },
    { title: 'Painting', icon: 'mdi-brush', execute: () => { } },
    { title: 'Conditions', icon: 'mdi-flask', execute: () => { } },
    { title: 'Distance', icon: 'mdi-ruler', execute: () => { } },
  ];

  @ViewChild('file') inputRef: ElementRef<HTMLInputElement>;

  constructor(private elRef: ElementRef) { }

  @HostListener('window:resize') onResize() { this.reposition(); }

  ngAfterViewInit(): void { this.reposition(); }

  reposition() {
    const el = this.elRef.nativeElement as HTMLElement;
    const halfBody = window.innerHeight / 2;
    const midPoint = el.clientHeight / 2;
    const top = halfBody - midPoint;
    el.style.top = `${top}px`;
  }

  onBackgroundImageClicked() {
    this.inputRef.nativeElement.click();
  }

  onBackgroundImageChange() {
    const image = this.inputRef.nativeElement.files[0];
    const url = URL.createObjectURL(image);
    console.log(url);
  }

  onToolbarItemClick(item: ToolbarItem) {
    item.execute.bind(this)();
  }
}
