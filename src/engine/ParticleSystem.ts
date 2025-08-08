import { Firework, Particle, Bounds } from './ParticleTypes';
import { PhysicsEngine } from './PhysicsEngine';
import { IRenderer } from './Renderer';

export class ParticleSystem {
  private fireworks: Firework[] = [];

  addFirework(firework: Firework): void {
    this.fireworks.push(firework);
  }

  update(deltaTime: number, bounds: Bounds): void {
    // Update all fireworks
    for (const firework of this.fireworks) {
      if (firework.isComplete) continue;

      // Update particles
      firework.particles = firework.particles.filter(particle => 
        PhysicsEngine.updateParticle(particle, deltaTime, bounds)
      );

      // Mark firework as complete if all particles are gone
      if (firework.particles.length === 0) {
        firework.isComplete = true;
      }
    }

    // Remove completed fireworks
    this.fireworks = this.fireworks.filter(firework => !firework.isComplete);
  }

  draw(renderer: IRenderer): void {
    for (const firework of this.fireworks) {
      for (const particle of firework.particles) {
        renderer.drawParticle(particle);
      }
    }
  }

  getFireworkCount(): number {
    return this.fireworks.length;
  }

  getParticleCount(): number {
    return this.fireworks.reduce((total, firework) => total + firework.particles.length, 0);
  }
}
