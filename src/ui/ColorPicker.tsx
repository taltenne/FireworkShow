import React, { useState } from 'react';
import { Rgb } from '@/engine/ParticleTypes';

interface ColorPickerProps {
  selectedColors: Rgb[];
  onColorsChange: (colors: Rgb[]) => void;
  disabled: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColors, onColorsChange, disabled }) => {
  const [newColor, setNewColor] = useState('#ffffff');

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColor(event.target.value);
  };

  const handleAddColor = () => {
    if (selectedColors.length >= 10) return; // Limit to 10 colors

    const rgb = hexToRgb(newColor);
    if (rgb && !selectedColors.some(c => c.r === rgb.r && c.g === rgb.g && c.b === rgb.b)) {
      onColorsChange([...selectedColors, rgb]);
    }
  };

  const handleRemoveColor = (colorToRemove: Rgb) => {
    onColorsChange(selectedColors.filter(c => c !== colorToRemove));
  };

  const hexToRgb = (hex: string): Rgb | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  return (
    <div className="color-picker">
      <div className="color-input-group">
        <input
          type="color"
          value={newColor}
          onChange={handleColorChange}
          disabled={disabled}
        />
        <button onClick={handleAddColor} disabled={disabled || selectedColors.length >= 10}>
          Add
        </button>
      </div>
      <div className="color-chips">
        {selectedColors.map((color, index) => (
          <div
            key={index}
            className="color-chip"
            style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
          >
            <button onClick={() => handleRemoveColor(color)} disabled={disabled}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
