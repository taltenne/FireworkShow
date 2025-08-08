import React from 'react';
import DurationSlider from './DurationSlider';
import ColorPicker from './ColorPicker';
import CelebrationToggle from './CelebrationToggle';
import { Rgb } from '@/engine/ParticleTypes';

interface BottomBarProps {
  duration: number;
  selectedColors: Rgb[];
  celebrationEnabled: boolean;
  onDurationChange: (duration: number) => void;
  onColorsChange: (colors: Rgb[]) => void;
  onCelebrationToggle: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ ...props }) => {
  try {
    return (
      <div className="bottom-bar">
        <div className="duration-slider">
          <label>Duration: {props.duration.toFixed(1)}s</label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={props.duration}
            onChange={(e) => props.onDurationChange(parseFloat(e.target.value))}
            disabled={props.celebrationEnabled}
          />
        </div>
        <div className="color-picker">
          <div style={{ marginBottom: '10px' }}>Colors: {props.selectedColors.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <input type="color" onChange={(e) => {
              const hex = e.target.value;
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              const newColor = { r, g, b };
              // Check if color already exists
              const exists = props.selectedColors.some(c => c.r === newColor.r && c.g === newColor.g && c.b === newColor.b);
              if (!exists && props.selectedColors.length < 10) {
                props.onColorsChange([...props.selectedColors, newColor]);
              }
            }} />
            <button onClick={() => props.onColorsChange([])}>Clear All</button>
          </div>
          <div className="color-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {props.selectedColors.map((color, index) => (
              <div
                key={index}
                className="color-chip"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                  border: '1px solid #fff',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const newColors = props.selectedColors.filter((_, i) => i !== index);
                  props.onColorsChange(newColors);
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#ff4d4d',
                  color: '#fff',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>×</div>
              </div>
            ))}
          </div>
        </div>
        <div className="celebration-toggle">
          <button onClick={props.onCelebrationToggle}>
            {props.celebrationEnabled ? 'Stop Celebration' : 'Start Celebration'}
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering BottomBar:', error);
    return <div className="bottom-bar">Error rendering controls</div>;
  }
};

export default BottomBar;
