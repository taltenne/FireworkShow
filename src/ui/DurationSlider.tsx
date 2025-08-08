import React from 'react';

interface DurationSliderProps {
  duration: number;
  onDurationChange: (duration: number) => void;
  disabled: boolean;
}

const DurationSlider: React.FC<DurationSliderProps> = ({ duration, onDurationChange, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDurationChange(parseFloat(event.target.value));
  };

  return (
    <div className="duration-slider">
      <label>Duration: {duration.toFixed(1)}s</label>
      <input
        type="range"
        min="1"
        max="5"
        step="0.1"
        value={duration}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default DurationSlider;
