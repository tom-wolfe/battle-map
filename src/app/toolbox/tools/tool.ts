export interface Tool {
  id: number;
  title: string;
  icon: string;
  activate(): void;
  deactivate(): void;
}
