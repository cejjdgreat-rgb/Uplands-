import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Single Day/Night Toggle Switch
 * Appears exclusively in the header navigation with smooth sliding transition.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { toggleTheme, isDay } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={!isDay}
      aria-label={isDay ? 'Currently Day Mode. Click to switch to Night Mode' : 'Currently Night Mode. Click to switch to Day Mode'}
      title={isDay ? 'Switch to Night Mode (🌙)' : 'Switch to Day Mode (☀️)'}
      className={`group relative inline-flex items-center h-8 w-15 rounded-full p-0.5 border cursor-pointer select-none transition-colors duration-450 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5D061] focus-visible:ring-offset-2 ${
        isDay
          ? 'bg-[#EBF5F0] border-[#B9D5C7] hover:border-[#8C6207]/60 shadow-xs'
          : 'bg-[#061F14] border-[#0F442C] hover:border-[#F5D061]/60 shadow-inner'
      } ${className}`}
    >
      {/* Track Background Decorative Icons */}
      <span className="w-full flex items-center justify-between px-1.5 pointer-events-none select-none">
        {/* Left: Sun icon indicator */}
        <Sun
          className={`w-3.5 h-3.5 transition-opacity duration-300 ${
            isDay ? 'opacity-0 text-[#8C6207]' : 'opacity-40 text-slate-400'
          }`}
        />
        {/* Right: Moon icon indicator */}
        <Moon
          className={`w-3.5 h-3.5 transition-opacity duration-300 ${
            !isDay ? 'opacity-0 text-[#F5D061]' : 'opacity-40 text-[#506A5F]'
          }`}
        />
      </span>

      {/* Single Animated Sliding Thumb Knob */}
      <span
        className={`absolute top-0.5 left-0.5 w-[26px] h-[26px] rounded-full flex items-center justify-center shadow-md transform transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDay
            ? 'translate-x-0 bg-white border border-[#B9D5C7] text-[#8C6207] shadow-slate-300/50'
            : 'translate-x-7 bg-[#0B3522] border border-[#C5972C]/70 text-[#F5D061] shadow-black/60'
        }`}
      >
        {isDay ? (
          <Sun className="w-3.5 h-3.5 transition-transform duration-300 rotate-0 group-hover:rotate-45 text-[#8C6207]" />
        ) : (
          <Moon className="w-3.5 h-3.5 transition-transform duration-300 -rotate-12 group-hover:rotate-0 text-[#F5D061] fill-[#F5D061]/20" />
        )}
      </span>
    </button>
  );
};
