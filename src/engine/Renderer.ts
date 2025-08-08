import { Particle, Bounds } from './ParticleTypes';

export interface IRenderer {
  resize(width: number, height: number): void;
  beginFrame(): void;
  drawParticle(particle: Particle): void;
  endFrame(): void;
  getBounds(): Bounds;
}
