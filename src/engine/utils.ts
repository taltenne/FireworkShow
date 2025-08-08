import { Rgb } from './ParticleTypes';

export class MathUtils {
  /**
   * Generate a random integer between min and max (inclusive)
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random float between min and max
   */
  static randomFloat(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  /**
   * Clamp a value between min and max
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}

export class ColorUtils {
  /**
   * Convert RGB color to CSS string
   */
  static rgbToString(color: Rgb): string {
    return `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`;
  }

  /**
   * Convert RGB color to RGBA string with alpha
   */
  static rgbToRgbaString(color: Rgb, alpha: number): string {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  }

  /**
   * Check if two colors are equal
   */
  static colorsEqual(color1: Rgb, color2: Rgb): boolean {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b;
  }

  /**
   * Create a deep copy of a color
   */
  static cloneColor(color: Rgb): Rgb {
    return { r: color.r, g: color.g, b: color.b };
  }

  /**
   * Select random colors from a palette, ensuring no duplicates
   */
  static selectRandomColors(palette: readonly Rgb[], count: number): Rgb[] {
    if (count <= 0) return [];
    if (count >= palette.length) return [...palette];

    const selectedColors: Rgb[] = [];
    const availableColors = [...palette];

    for (let i = 0; i < count && availableColors.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      selectedColors.push(availableColors[randomIndex]);
      availableColors.splice(randomIndex, 1);
    }

    return selectedColors;
  }
}
