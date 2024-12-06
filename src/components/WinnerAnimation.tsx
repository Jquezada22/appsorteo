import React from 'react';
import Confetti from 'react-confetti';

interface WinnerAnimationProps {
  winner: string;
}

const WinnerAnimation: React.FC<WinnerAnimationProps> = ({ winner }) => {
  return (
    <div className="winner-animation">
      <Confetti />
      <h1>¡El ganador es: {winner}!</h1>
    </div>
  );
};

export default WinnerAnimation;
