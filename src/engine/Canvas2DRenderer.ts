import { IRenderer } from './Renderer';
import { Particle, Bounds } from './ParticleTypes';
import { RENDERER_CONSTANTS } from './constants';
import { ColorUtils } from './utils';

export class Canvas2DRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private glowSprite: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D rendering context');
    }
    this.ctx = context;
    this.glowSprite = this.createGlowSprite();
    this.handleResize();
  }

  private createGlowSprite(): HTMLCanvasElement {
    const size = RENDERER_CONSTANTS.GLOW_SPRITE_SIZE;
    const sprite = document.createElement('canvas');
    sprite.width = size;
    sprite.height = size;
    const spriteCtx = sprite.getContext('2d')!;

    const center = size / 2;
    const gradient = spriteCtx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(0, 0, size, size);

    return sprite;
  }

  handleResize(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    this.ctx.scale(dpr, dpr);
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  beginFrame(): void {
    // Create trail effect by overlaying a semi-transparent black rectangle
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = `rgba(0, 0, 0, ${RENDERER_CONSTANTS.TRAIL_ALPHA})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Set additive blending for particles
    this.ctx.globalCompositeOperation = 'lighter';
  }

  drawParticle(particle: Particle): void {
    const { positionX, positionY, baseColor, alpha, radiusPx } = particle;
    
    // Set global alpha
    this.ctx.globalAlpha = alpha;
    
    // Create a radial gradient for the glow effect with the particle's color
    const gradient = this.ctx.createRadialGradient(
      positionX, positionY, 0,
      positionX, positionY, radiusPx * 2
    );
    
    const colorStr = ColorUtils.rgbToString(baseColor);
    gradient.addColorStop(0, colorStr);
    gradient.addColorStop(0.3, ColorUtils.rgbToRgbaString(baseColor, 0.8));
    gradient.addColorStop(0.7, ColorUtils.rgbToRgbaString(baseColor, 0.3));
    gradient.addColorStop(1, ColorUtils.rgbToRgbaString(baseColor, 0));
    
    this.ctx.fillStyle = gradient;
    
    // Draw the particle as a filled circle with glow
    this.ctx.beginPath();
    this.ctx.arc(positionX, positionY, radiusPx * 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  endFrame(): void {
    // Reset global alpha and composite operation
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = 'source-over';
  }

  getBounds(): Bounds {
    const rect = this.canvas.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  }

}
