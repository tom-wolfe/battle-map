import { Directive, Injector } from '@angular/core';
import { Toolbox } from '@bm/toolbox/toolbox';
import { Tool, ToolHandler } from '@bm/toolbox/tools';

@Directive({
  selector: '[bmTool]',
})
export class ToolDirective {
  tool: Tool;
  handler: ToolHandler;

  constructor(private toolbox: Toolbox, private injector: Injector) {
    this.toolbox.activeTool.subscribe(this.onToolChange.bind(this));
  }

  onToolChange(tool: Tool) {
    this.tool = tool;
    if (this.handler) {
      this.handler.destroy();
      this.handler = undefined;
    }
    if (tool.handler) {
      this.handler = new tool.handler(this.injector);
    }
  }
}
