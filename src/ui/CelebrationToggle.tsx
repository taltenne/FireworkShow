import React from 'react';

interface CelebrationToggleProps {
  celebrationEnabled: boolean;
  onCelebrationToggle: () => void;
}

const CelebrationToggle: React.FC<CelebrationToggleProps> = ({ celebrationEnabled, onCelebrationToggle }) => {
  return (
    <div className={`celebration-toggle ${celebrationEnabled ? 'active' : ''}`}>
      <button onClick={onCelebrationToggle}>
        {celebrationEnabled ? 'Stop Celebration' : 'Start Celebration'}
      </button>
    </div>
  );
};

export default CelebrationToggle;
