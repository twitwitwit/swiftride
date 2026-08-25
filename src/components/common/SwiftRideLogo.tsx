import React, { useState } from 'react';
import emblemImg from '../../assets/images/swiftride_emblem_graphic_1787614817859.png';
import textLogoImg from '../../assets/images/swiftride_text_logo_exact_1787615942068.jpg';

export interface SwiftRideLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'full' | 'icon-only' | 'horizontal' | 'text-only';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export const SwiftRideLogo: React.FC<SwiftRideLogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtitle = true,
  className = '',
  theme = 'light'
}) => {
  const [emblemError, setEmblemError] = useState(false);
  const [textError, setTextError] = useState(false);

  // Height mappings based on size
  const getEmblemHeight = () => {
    switch (size) {
      case 'xs': return 'h-6';
      case 'sm': return 'h-8';
      case 'md': return 'h-11';
      case 'lg': return 'h-16';
      case 'xl': return 'h-24';
      case '2xl': return 'h-32';
    }
  };

  const getTextLogoHeight = () => {
    switch (size) {
      case 'xs': return 'h-4';
      case 'sm': return 'h-6';
      case 'md': return 'h-8';
      case 'lg': return 'h-12';
      case 'xl': return 'h-16';
      case '2xl': return 'h-20';
    }
  };

  const getFullBadgeHeight = () => {
    switch (size) {
      case 'xs': return 'h-12';
      case 'sm': return 'h-16';
      case 'md': return 'h-28';
      case 'lg': return 'h-40';
      case 'xl': return 'h-52';
      case '2xl': return 'h-64';
    }
  };

  const getSubtitleSize = () => {
    switch (size) {
      case 'xs': return 'text-[7px]';
      case 'sm': return 'text-[8px]';
      case 'md': return 'text-[10px]';
      case 'lg': return 'text-xs';
      case 'xl': return 'text-sm';
      case '2xl': return 'text-base';
    }
  };

  // 1. Text-Only Variant (SwiftRide 3D Text Logo)
  if (variant === 'text-only') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        {!textError ? (
          <img
            src={textLogoImg}
            alt="SwiftRide"
            className={`${getTextLogoHeight()} w-auto object-contain drop-shadow-md`}
            onError={() => setTextError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="font-black italic text-2xl uppercase tracking-tighter text-black drop-shadow-[0_2px_0_#f59e0b]">
            Swift<span className="text-amber-500">Ride</span>
          </span>
        )}
      </div>
    );
  }

  // 2. Icon-Only Variant (Sedan + Speed Trail + Motorcycle Emblem)
  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        {!emblemError ? (
          <div className={`${getEmblemHeight()} flex items-center justify-center`}>
            <img
              src={emblemImg}
              alt="SwiftRide Emblem"
              className="h-full w-auto object-contain drop-shadow-md"
              onError={() => setEmblemError(true)}
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className={`${getEmblemHeight()} aspect-[16/9] bg-slate-900 rounded-lg flex items-center justify-center text-amber-400 font-black text-xs`}>
            SR
          </div>
        )}
      </div>
    );
  }

  // 3. Full Hero Badge (Emblem on top + 3D Text Logo below + Subtitle)
  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
        <div className="relative group flex flex-col items-center max-w-full">
          {/* Emblem Artwork */}
          <div className={`${getFullBadgeHeight()} w-auto flex items-center justify-center p-1 relative`}>
            {!emblemError ? (
              <img
                src={emblemImg}
                alt="SwiftRide Vehicle Speed Emblem"
                className="max-h-full max-w-full object-contain drop-shadow-xl"
                onError={() => setEmblemError(true)}
                referrerPolicy="no-referrer"
              />
            ) : null}
          </div>

          {/* Text Wordmark */}
          <div className="mt-1 flex flex-col items-center">
            {!textError ? (
              <img
                src={textLogoImg}
                alt="SwiftRide Logotype"
                className={`${getTextLogoHeight()} w-auto object-contain drop-shadow-md`}
                onError={() => setTextError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="font-black italic text-2xl tracking-tighter text-slate-950 font-display">
                Swift<span className="text-amber-500">Ride</span>
              </div>
            )}

            {showSubtitle && (
              <span className={`font-black italic tracking-widest uppercase mt-1 ${getSubtitleSize()} ${
                theme === 'dark' ? 'text-amber-400' : 'text-slate-800'
              }`}>
                Safe. Reliable. Convenient.
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. Horizontal Variant (Emblem Left + SwiftRide Wordmark Right)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Emblem Graphic */}
      <div className={`${getEmblemHeight()} flex items-center justify-center shrink-0`}>
        {!emblemError ? (
          <img
            src={emblemImg}
            alt="SwiftRide Logo"
            className="h-full w-auto object-contain drop-shadow-sm"
            onError={() => setEmblemError(true)}
            referrerPolicy="no-referrer"
          />
        ) : null}
      </div>

      {/* Text Wordmark */}
      <div className="flex flex-col items-start leading-none justify-center">
        {!textError ? (
          <img
            src={textLogoImg}
            alt="SwiftRide"
            className={`${getTextLogoHeight()} w-auto object-contain`}
            onError={() => setTextError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className={`font-black italic uppercase tracking-tighter text-lg ${
            theme === 'dark' ? 'text-white' : 'text-slate-950'
          }`}>
            Swift<span className="text-amber-500">Ride</span>
          </span>
        )}

        {showSubtitle && (
          <span className={`font-extrabold italic tracking-wider uppercase mt-0.5 ${getSubtitleSize()} ${
            theme === 'dark' ? 'text-amber-400/90' : 'text-slate-600'
          }`}>
            Fast and Safe Travel
          </span>
        )}
      </div>
    </div>
  );
};

