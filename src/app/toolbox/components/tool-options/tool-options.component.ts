import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Toolbox } from '@bm/toolbox/toolbox';
import { Tool } from '@bm/toolbox/tools/tool';

@Component({
  selector: 'bm-tool-options',
  templateUrl: './tool-options.component.html',
  styleUrls: ['./tool-options.component.scss']
})
export class ToolOptionsComponent implements AfterViewInit {
  tool: Tool;

  @ViewChild('toolHost', { read: ViewContainerRef }) toolHost: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver, private toolbox: Toolbox) { }

  ngAfterViewInit() {
    this.toolbox.activeTool$.subscribe(this.onActiveToolChange.bind(this));
  }

  onActiveToolChange(tool: Tool) {
    setTimeout(() => {
      this.tool = tool;
      this.toolHost.clear();
      if (this.tool.settingsComponent) {
        const componentFactory = this.factoryResolver.resolveComponentFactory(this.tool.settingsComponent);
        this.toolHost.createComponent(componentFactory);
      }
    }, 0);
  }
}
