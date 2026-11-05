import React from 'react';
import {
  TORN_TOP_FIBER_PATH,
  TORN_TOP_UPPER_PATH,
  TORN_BOT_FIBER_PATH,
  TORN_BOT_LOWER_PATH,
} from './constants/tornPaperPaths';

interface TornPaperDividerProps {
  type: 'top' | 'bottom';
}

export const TornPaperDivider: React.FC<TornPaperDividerProps> = ({ type }) => {
  if (type === 'top') {
    return (
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-10">
        <svg
          viewBox="0 0 1000 230"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 block"
        >
          <path d={TORN_TOP_FIBER_PATH} fill="#FFFFFF" />
          <path
            d={TORN_TOP_UPPER_PATH}
            fill="#F5ECE0"
            style={{ filter: 'drop-shadow(0px 3px 4px rgba(60, 35, 18, 0.18))' }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden leading-none select-none pointer-events-none -my-1 relative z-10">
      <svg
        viewBox="0 0 1000 230"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 block"
      >
        <path d={TORN_BOT_LOWER_PATH} fill="#EBDDCE" />
        <path
          d={TORN_BOT_FIBER_PATH}
          fill="#FFFFFF"
          style={{ filter: 'drop-shadow(0px 3px 4px rgba(60, 35, 18, 0.18))' }}
        />
      </svg>
    </div>
  );
};
