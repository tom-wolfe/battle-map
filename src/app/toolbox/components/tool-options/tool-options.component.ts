import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Toolbox } from '@bm/toolbox/toolbox';
import { Tool } from '@bm/toolbox/tools';

@Component({
  selector: 'bm-tool-options',
  templateUrl: './tool-options.component.html',
  styleUrls: ['./tool-options.component.scss']
})
export class ToolOptionsComponent implements AfterViewInit {
  toolName: string;

  @ViewChild('toolHost', { read: ViewContainerRef }) toolHost: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver, private toolbox: Toolbox) { }

  ngAfterViewInit() {
    this.toolbox.activeTool$.subscribe(this.onActiveToolChange.bind(this));
  }

  onActiveToolChange(tool: Tool) {
    setTimeout(() => {
      this.toolHost.clear();
      this.toolName = undefined;
      if (!tool) { return; }
      this.toolName = tool.title;
      const settings = this.toolbox.getToolSettingsComponent(tool);
      if (!settings) { return; }
      const componentFactory = this.factoryResolver.resolveComponentFactory(settings);
      this.toolHost.createComponent(componentFactory);
    }, 0);
  }
}
