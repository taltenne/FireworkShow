import { Particle, Firework, FireworkConfig } from './ParticleTypes';
import { FIREWORK_CONSTANTS } from './constants';
import { MathUtils, ColorUtils } from './utils';

export class ParticleFactory {
  /**
   * Creates a complete firework with the specified parameters
   */
  static createFirework(centerX: number, centerY: number, config: FireworkConfig): Firework {
    const particles: Particle[] = [];

    for (let i = 0; i < config.particleCount; i++) {
      const particle = this.createParticle(centerX, centerY, config);
      particles.push(particle);
    }

    return {
      particles,
      isComplete: false,
    };
  }

  /**
   * Creates a single particle with realistic 3D spherical distribution
   */
  static createParticle(centerX: number, centerY: number, config: FireworkConfig): Particle {
    // Create 3D spherical distribution for more realistic firework behavior
    // Use spherical coordinates: theta (azimuthal) and phi (polar)
    const theta = Math.random() * Math.PI * 2; // 0 to 2π (full rotation)
    const phi = Math.acos(2 * Math.random() - 1); // 0 to π (uniform distribution on sphere)
    
    // Calculate velocity components
    const velocity = this.calculateParticleVelocity(theta, phi, config.durationSeconds);
    
    // Select random color from available options
    const baseColor = this.selectRandomColor(config.colorOptions);
    
    // Calculate max age with jitter to avoid synchronized disappearance
    const maxAgeSeconds = this.calculateMaxAge(config.durationSeconds);
    
    // Generate random particle size
    const radiusPx = MathUtils.randomFloat(FIREWORK_CONSTANTS.RADIUS_MIN, FIREWORK_CONSTANTS.RADIUS_MAX);

    return {
      positionX: centerX,
      positionY: centerY,
      velocityX: velocity.x,
      velocityY: velocity.y,
      gravity: 900, // Will be applied by physics engine
      ageSeconds: 0,
      maxAgeSeconds,
      baseColor: ColorUtils.cloneColor(baseColor),
      alpha: 1.0,
      radiusPx,
      hasTouchedBoundary: false,
    };
  }

  /**
   * Calculates particle velocity using spherical coordinates with realistic physics
   */
  private static calculateParticleVelocity(theta: number, phi: number, durationSeconds: number) {
    // Random speed with variation
    const baseSpeed = MathUtils.randomFloat(
      FIREWORK_CONSTANTS.SPEED_MIN, 
      FIREWORK_CONSTANTS.SPEED_MAX
    );
    
    // Scale speed with duration to maintain consistent visual coverage
    const speed = baseSpeed * (durationSeconds / FIREWORK_CONSTANTS.DEFAULT_DURATION_DIVISOR);
    
    // Add natural speed variation
    const speedVariation = MathUtils.randomFloat(
      FIREWORK_CONSTANTS.SPEED_VARIATION_MIN, 
      FIREWORK_CONSTANTS.SPEED_VARIATION_MAX
    );
    const finalSpeed = speed * speedVariation;

    // Convert spherical to cartesian coordinates
    const sphereX = Math.sin(phi) * Math.cos(theta);
    const sphereY = Math.cos(phi);
    
    // Project 3D to 2D and add upward bias for firework effect
    const velocityX = sphereX * finalSpeed;
    
    // Make particles tend to go upward initially (negative Y is up in canvas)
    const upwardBias = MathUtils.randomFloat(
      FIREWORK_CONSTANTS.UPWARD_BIAS_MAX, 
      FIREWORK_CONSTANTS.UPWARD_BIAS_MIN
    );
    const velocityY = (sphereY + upwardBias) * finalSpeed;

    return { x: velocityX, y: velocityY };
  }

  /**
   * Selects a random color from the available options
   */
  private static selectRandomColor(colorOptions: readonly Particle['baseColor'][]): Particle['baseColor'] {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  }

  /**
   * Calculates max age with jitter to prevent synchronized disappearance
   */
  private static calculateMaxAge(durationSeconds: number): number {
    const maxAgeJitter = (Math.random() - 0.5) * FIREWORK_CONSTANTS.MAX_AGE_JITTER;
    return durationSeconds * (1 + maxAgeJitter);
  }
}
