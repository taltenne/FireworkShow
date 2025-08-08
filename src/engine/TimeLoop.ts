import { RENDERER_CONSTANTS } from './constants';

export class TimeLoop {
  private callback: (deltaTime: number) => void;
  private isRunning = false;
  private lastTime = 0;
  private animationFrameId: number | null = null;

  constructor(callback: (deltaTime: number) => void) {
    this.callback = callback;
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private loop = (): void => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, RENDERER_CONSTANTS.MAX_DELTA_TIME);
    this.lastTime = currentTime;

    this.callback(deltaTime);

    this.animationFrameId = requestAnimationFrame(this.loop);
  };
}
