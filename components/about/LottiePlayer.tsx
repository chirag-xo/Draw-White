'use client';

import React, { useEffect, useRef } from 'react';

interface LottiePlayerProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ 
  animationData, 
  loop = true, 
  autoplay = true,
  className = "" 
}) => {
  const container = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    if (!container.current || !animationData) return;

    const initLottie = () => {
      const lottie = (window as any).lottie;
      if (!lottie || !container.current) return;

      if (animationInstance.current) {
        animationInstance.current.destroy();
      }

      animationInstance.current = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData
      });
      console.log('Lottie Init with direct data');
    };

    if ((window as any).lottie) {
      initLottie();
    } else {
      const interval = setInterval(() => {
        if ((window as any).lottie) {
          initLottie();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, [animationData, loop, autoplay]);

  return <div ref={container} className={className} />;
};

export default LottiePlayer;
