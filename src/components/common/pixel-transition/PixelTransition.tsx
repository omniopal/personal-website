import React, { useRef, useEffect, useState, CSSProperties } from 'react';

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  pixelColor?: string;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  pixelColor = 'currentColor',
  className = '',
  style = {},
  aspectRatio = '100%'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const defaultRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const delayedCallRef = useRef<any>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const gridSize = 16;
  const animationStepDuration = 0.2;
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixel.style.position = 'absolute';
        pixel.style.display = 'none';
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate: boolean): void => {
    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    const defaultEl = defaultRef.current;
    
    if (!pixelGridEl || !activeEl || !defaultEl) return;

    const pixels = Array.from(pixelGridEl.querySelectorAll<HTMLDivElement>('.pixelated-image-card__pixel'));
    if (!pixels.length) return;

    // Clear any existing timeouts
    if (delayedCallRef.current) {
      clearTimeout(delayedCallRef.current);
    }

    // Reset all pixels to hidden
    pixels.forEach(pixel => pixel.style.display = 'none');

    // Animate pixels appearing
    const totalPixels = pixels.length;
    const staggerDelay = (animationStepDuration * 1000) / totalPixels;

    pixels.forEach((pixel, index) => {
      setTimeout(() => {
        pixel.style.display = 'block';
      }, Math.random() * (animationStepDuration * 1000));
    });

    // Switch content in the middle of animation
    delayedCallRef.current = setTimeout(() => {
      if (activate) {
        defaultEl.style.display = 'none';
        activeEl.style.display = 'block';
        setIsActive(true);
      } else {
        activeEl.style.display = 'none';
        defaultEl.style.display = 'block';
        setIsActive(false);
      }
    }, animationStepDuration * 1000);

    // Hide pixels after animation
    pixels.forEach((pixel, index) => {
      setTimeout(() => {
        pixel.style.display = 'none';
      }, (animationStepDuration * 2000) + Math.random() * (animationStepDuration * 1000));
    });
  };

  const handleMouseEnter = (): void => {
    if (!isActive) animatePixels(true);
  };

  const handleMouseLeave = (): void => {
    if (isActive) animatePixels(false);
  };

  const handleClick = (): void => {
    animatePixels(!isActive);
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={{
        // backgroundColor: '#222',
        color: '#fff',
        borderRadius: '4px',
        // border: '2px solid #fff',
        width: '260px',
        height: '290px',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />
      
      <div 
        ref={defaultRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          display: 'block'
        }}
      >
        {firstContent}
      </div>
      
      <div 
        ref={activeRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          display: 'none'
        }}
      >
        {secondContent}
      </div>
      
      <div 
        ref={pixelGridRef}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          zIndex: 3,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default PixelTransition;