import React, { useRef, useEffect, useState } from 'react';
import BottomBar from './ui/BottomBar';
import { Canvas2DRenderer } from './engine/Canvas2DRenderer';
import { ParticleSystem } from './engine/ParticleSystem';
import { FireworkController } from './engine/FireworkController';
import { CelebrationController } from './engine/CelebrationController';
import { TimeLoop } from './engine/TimeLoop';
import { AppState, Rgb } from './engine/ParticleTypes';
import { DEFAULT_COLORS } from './engine/constants';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [appState, setAppState] = useState<AppState>({
    duration: 3.0,
    selectedColors: [...DEFAULT_COLORS],
    celebrationEnabled: false,
  });

  const rendererRef = useRef<Canvas2DRenderer | null>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const fireworkControllerRef = useRef<FireworkController | null>(null);
  const celebrationControllerRef = useRef<CelebrationController | null>(null);
  const timeLoopRef = useRef<TimeLoop | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize the engine components
    const renderer = new Canvas2DRenderer(canvas);
    const particleSystem = new ParticleSystem();
    const fireworkController = new FireworkController(particleSystem, appState);
    const celebrationController = new CelebrationController(particleSystem, appState);
    
    // Store references
    rendererRef.current = renderer;
    particleSystemRef.current = particleSystem;
    fireworkControllerRef.current = fireworkController;
    celebrationControllerRef.current = celebrationController;

    // Set up the game loop
    const timeLoop = new TimeLoop((deltaTime: number) => {
      const bounds = renderer.getBounds();
      particleSystem.update(deltaTime, bounds);
      
      renderer.beginFrame();
      particleSystem.draw(renderer);
      renderer.endFrame();
    });

    timeLoopRef.current = timeLoop;
    timeLoop.start();

    // Handle window resize
    const handleResize = () => {
      renderer.handleResize();
      const bounds = renderer.getBounds();
      celebrationController.updateCanvasSize(bounds.width, bounds.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => {
      timeLoop.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update controllers when app state changes
  useEffect(() => {
    if (fireworkControllerRef.current) {
      fireworkControllerRef.current.updateState(appState);
    }
    if (celebrationControllerRef.current) {
      celebrationControllerRef.current.updateState(appState);
    }
  }, [appState]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (appState.celebrationEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas || !fireworkControllerRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    fireworkControllerRef.current.spawnAt(x, y);
  };

  const updateDuration = (duration: number) => {
    setAppState(prev => ({ ...prev, duration }));
  };

  const updateColors = (colors: Rgb[]) => {
    setAppState(prev => ({ ...prev, selectedColors: colors }));
  };

  const toggleCelebration = () => {
    setAppState(prev => ({ ...prev, celebrationEnabled: !prev.celebrationEnabled }));
  };

  return (
    <div className="app">
      <canvas
        ref={canvasRef}
        className="firework-canvas"
        onClick={handleCanvasClick}
      />
      <BottomBar
        duration={appState.duration}
        selectedColors={appState.selectedColors}
        celebrationEnabled={appState.celebrationEnabled}
        onDurationChange={updateDuration}
        onColorsChange={updateColors}
        onCelebrationToggle={toggleCelebration}
      />
    </div>
  );
};

export default App;
