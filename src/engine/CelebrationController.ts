import { ParticleSystem } from './ParticleSystem';
import { FireworkConfig, AppState } from './ParticleTypes';
import { ParticleFactory } from './ParticleFactory';
import { CELEBRATION_CONSTANTS, EXTENDED_COLORS } from './constants';
import { MathUtils, ColorUtils } from './utils';

export class CelebrationController {
  private particleSystem: ParticleSystem;
  private appState: AppState;
  private intervalId: number | null = null;
  private canvasWidth = 800;
  private canvasHeight = 600;

  constructor(particleSystem: ParticleSystem, appState: AppState) {
    this.particleSystem = particleSystem;
    this.appState = appState;
  }

  updateState(appState: AppState): void {
    const wasEnabled = this.appState.celebrationEnabled;
    this.appState = appState;

    // Handle toggling celebration mode
    if (appState.celebrationEnabled && !wasEnabled) {
      this.startCelebration();
    } else if (!appState.celebrationEnabled && wasEnabled) {
      this.stopCelebration();
    }
  }

  updateCanvasSize(width: number, height: number): void {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  private startCelebration(): void {
    if (this.intervalId !== null) return;

    const spawnFirework = () => {
      // Random position
      const x = Math.random() * this.canvasWidth;
      const y = Math.random() * this.canvasHeight;

      // Random configuration for celebration fireworks
      const config: FireworkConfig = {
        durationSeconds: MathUtils.randomFloat(
          CELEBRATION_CONSTANTS.DURATION_MIN, 
          CELEBRATION_CONSTANTS.DURATION_MAX
        ),
        colorOptions: this.getRandomColors(),
        particleCount: MathUtils.randomInt(200, 500),
      };

      const firework = ParticleFactory.createFirework(x, y, config);
      this.particleSystem.addFirework(firework);

      // Schedule next firework with random interval
      const nextInterval = MathUtils.randomFloat(
        CELEBRATION_CONSTANTS.SPAWN_INTERVAL_MIN,
        CELEBRATION_CONSTANTS.SPAWN_INTERVAL_MAX
      );
      this.intervalId = window.setTimeout(spawnFirework, nextInterval);
    };

    // Start the first firework
    spawnFirework();
  }

  private stopCelebration(): void {
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Gets random colors for celebration fireworks
   * Uses user-selected colors if available, otherwise selects from extended palette
   */
  private getRandomColors() {
    // Use selected colors if available
    if (this.appState.selectedColors.length > 0) {
      return this.appState.selectedColors;
    }

    // Otherwise, select random colors from the extended palette
    const numColors = MathUtils.randomInt(
      CELEBRATION_CONSTANTS.RANDOM_COLORS_MIN, 
      CELEBRATION_CONSTANTS.RANDOM_COLORS_MAX
    );
    
    return ColorUtils.selectRandomColors(EXTENDED_COLORS, numColors);
  }
}
