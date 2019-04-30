import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Tool, Toolbox } from '@bm/toolbox';

@Component({
  selector: 'bm-tool-options',
  templateUrl: './tool-options.component.html',
  styleUrls: ['./tool-options.component.scss']
})
export class ToolOptionsComponent implements AfterViewInit {
  toolName: string;

  @ViewChild('toolHost', { read: ViewContainerRef }) toolHost: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver, private tools: Toolbox) { }

  ngAfterViewInit() {
    this.tools.activeTool.subscribe(this.onActiveToolChange.bind(this));
  }

  onActiveToolChange(tool: Tool) {
    this.toolHost.clear();
    this.toolName = undefined;
    if (!tool || !tool.settingsComponent) { return; }
    this.toolName = tool.title;
    const componentFactory = this.factoryResolver.resolveComponentFactory(tool.settingsComponent);
    this.toolHost.createComponent(componentFactory);
  }
}
