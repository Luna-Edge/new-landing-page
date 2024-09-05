export const parsePixelValue = (pixelString: string): number => {
  const match = pixelString.match(/^(\d+)px/);
  return match ? parseInt(match[1], 10) : 0;
};
