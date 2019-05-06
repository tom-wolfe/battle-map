import { Point } from '@bm/models';

export function relativePoint(point: Point, el: HTMLElement): Point {
  const offset = el.getBoundingClientRect();
  return { x: point.x - offset.left, y: point.y - offset.top };
}

export function relativeMouse(e: MouseEvent, el: HTMLElement): Point {
  return relativePoint({ x: e.clientX, y: e.clientY }, el);
}

export function relativeHammer(e: HammerInput, el: HTMLElement): Point {
  return relativePoint({ x: e.center.x, y: e.center.y }, el);
}
