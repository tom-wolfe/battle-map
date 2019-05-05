export function fetchImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onload = () => resolve(img);
    img.src = src;
  });
}
