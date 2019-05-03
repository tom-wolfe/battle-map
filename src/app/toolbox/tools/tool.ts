import { Type } from '@angular/core';

export interface Tool {
  id: number;
  title: string;
  icon: string;
  settingsComponent?: Type<{}>;
  activate(): void;
  deactivate(): void;
}
