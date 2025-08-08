import { ParticleSystem } from './ParticleSystem';
import { FireworkConfig, AppState } from './ParticleTypes';
import { ParticleFactory } from './ParticleFactory';
import { DEFAULT_COLORS, FIREWORK_CONSTANTS } from './constants';
import { MathUtils } from './utils';

export class FireworkController {
  private particleSystem: ParticleSystem;
  private appState: AppState;

  constructor(particleSystem: ParticleSystem, appState: AppState) {
    this.particleSystem = particleSystem;
    this.appState = appState;
  }

  updateState(appState: AppState): void {
    this.appState = appState;
  }

  spawnAt(x: number, y: number): void {
    const config: FireworkConfig = {
      durationSeconds: this.appState.duration,
      colorOptions: this.getEffectiveColors(),
      particleCount: MathUtils.randomInt(
        FIREWORK_CONSTANTS.PARTICLE_COUNT_MIN, 
        FIREWORK_CONSTANTS.PARTICLE_COUNT_MAX
      ),
    };

    const firework = ParticleFactory.createFirework(x, y, config);
    this.particleSystem.addFirework(firework);
  }

  /**
   * Gets the effective colors to use, falling back to defaults if none selected
   */
  private getEffectiveColors() {
    return this.appState.selectedColors.length > 0 
      ? this.appState.selectedColors 
      : [...DEFAULT_COLORS];
  }
}
