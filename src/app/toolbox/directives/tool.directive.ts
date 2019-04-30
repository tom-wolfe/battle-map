import { Directive } from '@angular/core';
import { Toolbox } from '@bm/toolbox/toolbox';
import { Tool, ToolHandler } from '@bm/toolbox/tools';

@Directive({
  selector: '[bmTool]',
})
export class ToolDirective {
  tool: Tool;
  handler: ToolHandler;

  constructor(private toolbox: Toolbox) {
    this.toolbox.activeTool.subscribe(this.onToolChange.bind(this));
  }

  onToolChange(tool: Tool) {
    this.tool = tool;
    this.handler = new tool.handler();
  }
}
