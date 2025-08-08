export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface FireworkConfig {
  durationSeconds: number;
  colorOptions: Rgb[];
  particleCount: number;
}

export interface Particle {
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  ageSeconds: number;
  maxAgeSeconds: number;
  baseColor: Rgb;
  alpha: number;
  radiusPx: number;
  hasTouchedBoundary: boolean;
}

export interface Firework {
  particles: Particle[];
  isComplete: boolean;
}

export interface Bounds {
  width: number;
  height: number;
}

export interface AppState {
  duration: number;
  selectedColors: Rgb[];
  celebrationEnabled: boolean;
}
