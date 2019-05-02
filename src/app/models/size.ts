export enum Size {
  Tiny = 'tiny',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Huge = 'huge',
  Gargantuan = 'gargantuan'
}

export const Sizes = [
  { id: Size.Tiny, name: 'Tiny', scale: 0.5 },
  { id: Size.Small, name: 'Small', scale: 0.75 },
  { id: Size.Medium, name: 'Medium', scale: 1 },
  { id: Size.Large, name: 'Large', scale: 2 },
  { id: Size.Huge, name: 'Huge', scale: 3 },
  { id: Size.Gargantuan, name: 'Gargantuan', scale: 4 }
];
