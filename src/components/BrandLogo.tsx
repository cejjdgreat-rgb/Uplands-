import React from 'react';
import masterLogoAsset from '../assets/images/uplands_official_logo.jpg';
import { useTheme } from '../context/ThemeContext';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  forceDark?: boolean;
}

/**
 * UPLANDS CULINARY HUB MASTER LOGO
 * 
 * Official, authoritative brand asset component.
 * Uses the exact original supplied logo file without modification,
 * recreation, stylization, or color alteration. Only proportional
 * display scaling is applied across all viewports and themes.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md',
  forceDark = false,
}) => {
  let isDay = false;
  try {
    const themeContext = useTheme();
    isDay = !forceDark && themeContext.isDay;
  } catch {
    isDay = false;
  }

  // Proportional sizing calibrated for all viewports (mobile, tablet, laptop, desktop)
  const sizeClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-13 sm:h-14',
    lg: 'h-24 sm:h-28',
    hero: 'h-36 sm:h-44',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* 
        Surrounding UI contrast container:
        The official logo has an original deep black canvas.
        On Day/Light mode, a neat black bezel with subtle border ensures pristine visibility
        without modifying or recoloring the original logo asset itself.
      */}
      <div
        className={`relative flex items-center justify-center rounded-xl overflow-hidden transition-all duration-200 ${
          sizeClasses[size]
        } ${
          isDay
            ? 'bg-black p-0.5 border border-[#D1E7DD] shadow-sm'
            : 'bg-black p-0.5 border border-[#0F3823] shadow-md'
        }`}
      >
        <img
          src={masterLogoAsset}
          alt="Uplands Culinary Hub — Good Food. Great Taste. Made With Love."
          loading="eager"
          decoding="async"
          className="h-full w-auto object-contain rounded-lg block"
        />
      </div>

      {showTagline && (
        <p
          className={`mt-2 text-xs tracking-wider font-medium transition-colors duration-300 ${
            isDay ? 'text-[#165B37]' : 'text-amber-100/80'
          }`}
        >
          Good Food. Great Taste. Made with Love.
        </p>
      )}
    </div>
  );
};
