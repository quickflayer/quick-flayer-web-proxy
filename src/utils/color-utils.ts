/**
 * Mixes a given hex color with white by a specified percentage.
 * @example
 * mixWithWhite('#FF0000', 50) // returns '#FF8080'
 * @param hex - The hex color to mix.
 * @param percentage - The percentage to mix with white (0-100).
 * @returns The mixed hex color.
 */
export const mixWithWhite = (hex: string, percentage: number): string => {
  percentage = Math.min(100, Math.max(0, percentage));

  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const mix = (channel: number) =>
    Math.round(channel + (255 - channel) * (percentage / 100));

  const toHex = (value: number) => value.toString(16).padStart(2, '0');

  const mixedR = toHex(mix(r));
  const mixedG = toHex(mix(g));
  const mixedB = toHex(mix(b));

  return `#${mixedR}${mixedG}${mixedB}`;
};

export const hexToRGBA = (hex: string, alpha = 1): string => {
  const [r, g, b] = hex
    .replace(/^#/, '')
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
