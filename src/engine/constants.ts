// Physics constants
export const PHYSICS_CONSTANTS = {
  GRAVITY: 900, // px/s^2
  DAMPING: 0.995, // per frame
  BOUNDARY_FADE_MULTIPLIER: 0.94, // per frame after boundary contact
  MIN_ALPHA: 0.02,
} as const;

// Firework spawn parameters
export const FIREWORK_CONSTANTS = {
  SPEED_MIN: 120,
  SPEED_MAX: 420,
  PARTICLE_COUNT_MIN: 200,
  PARTICLE_COUNT_MAX: 500,
  RADIUS_MIN: 3,
  RADIUS_MAX: 6,
  UPWARD_BIAS_MIN: -0.3,
  UPWARD_BIAS_MAX: -0.7,
  SPEED_VARIATION_MIN: 0.7,
  SPEED_VARIATION_MAX: 1.3,
  MAX_AGE_JITTER: 0.2, // ±10%
  DEFAULT_DURATION_DIVISOR: 3.0,
} as const;

// Celebration mode constants
export const CELEBRATION_CONSTANTS = {
  SPAWN_INTERVAL_MIN: 200, // ms
  SPAWN_INTERVAL_MAX: 500, // ms
  DURATION_MIN: 1, // seconds
  DURATION_MAX: 5, // seconds
  RANDOM_COLORS_MIN: 1,
  RANDOM_COLORS_MAX: 4,
} as const;

// Renderer constants
export const RENDERER_CONSTANTS = {
  TRAIL_ALPHA: 0.08,
  GLOW_SPRITE_SIZE: 32,
  MAX_DELTA_TIME: 1 / 30, // Cap at 30 FPS minimum
} as const;

// Default color palette
export const DEFAULT_COLORS = [
  { r: 255, g: 100, b: 100 }, // Red
  { r: 100, g: 255, b: 100 }, // Green
  { r: 100, g: 100, b: 255 }, // Blue
  { r: 255, g: 255, b: 100 }, // Yellow
  { r: 255, g: 100, b: 255 }, // Magenta
  { r: 100, g: 255, b: 255 }, // Cyan
] as const;

// Extended color palette for celebrations
export const EXTENDED_COLORS = [
  ...DEFAULT_COLORS,
  { r: 255, g: 200, b: 100 }, // Orange
  { r: 200, g: 100, b: 255 }, // Purple
] as const;
