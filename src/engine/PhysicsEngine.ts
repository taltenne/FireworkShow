import { Particle, Bounds } from './ParticleTypes';
import { PHYSICS_CONSTANTS } from './constants';

export class PhysicsEngine {

  static updateParticle(particle: Particle, deltaTime: number, bounds: Bounds): boolean {
    // Age the particle
    particle.ageSeconds += deltaTime;
    
    // Check if particle has exceeded its lifespan
    if (particle.ageSeconds >= particle.maxAgeSeconds) {
      return false; // Remove particle
    }

    // Apply gravity
    particle.velocityY += PHYSICS_CONSTANTS.GRAVITY * deltaTime;

    // Apply damping
    particle.velocityX *= PHYSICS_CONSTANTS.DAMPING;
    particle.velocityY *= PHYSICS_CONSTANTS.DAMPING;

    // Update position
    particle.positionX += particle.velocityX * deltaTime;
    particle.positionY += particle.velocityY * deltaTime;

    // Check boundaries and apply boundary rules
    this.handleBoundaryCollision(particle, bounds);

    // Update alpha based on age and boundary contact
    this.updateAlpha(particle);

    // Remove particle if alpha is too low
    return particle.alpha >= PHYSICS_CONSTANTS.MIN_ALPHA;
  }

  private static handleBoundaryCollision(particle: Particle, bounds: Bounds): void {
    let boundaryHit = false;

    // Check left and right boundaries
    if (particle.positionX < 0) {
      particle.positionX = 0;
      boundaryHit = true;
    } else if (particle.positionX > bounds.width) {
      particle.positionX = bounds.width;
      boundaryHit = true;
    }

    // Check top and bottom boundaries
    if (particle.positionY < 0) {
      particle.positionY = 0;
      boundaryHit = true;
    } else if (particle.positionY > bounds.height) {
      particle.positionY = bounds.height;
      boundaryHit = true;
    }

    // Mark particle as having touched boundary on first contact
    if (boundaryHit && !particle.hasTouchedBoundary) {
      particle.hasTouchedBoundary = true;
      particle.alpha = Math.min(particle.alpha, 0.7);
    }
  }

  private static updateAlpha(particle: Particle): void {
    // Natural fade based on age
    const ageFactor = 1 - (particle.ageSeconds / particle.maxAgeSeconds);
    let baseAlpha = ageFactor;

    // Apply accelerated fade if particle has touched boundary
    if (particle.hasTouchedBoundary) {
      particle.alpha *= PHYSICS_CONSTANTS.BOUNDARY_FADE_MULTIPLIER;
      baseAlpha = Math.min(baseAlpha, particle.alpha);
    }

    particle.alpha = baseAlpha;
  }
}
