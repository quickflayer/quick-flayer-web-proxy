'use client';

import { useEffect, useState } from 'react';

import { BREAKPOINTS } from '@/constants';

/**
 * Custom hook to detect mobile screen size
 * @returns {boolean} true if screen width is below MD breakpoint (768px)
 */
export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MD);
    };

    // Check on mount
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

/**
 * Custom hook to detect tablet screen size
 * @returns {boolean} true if screen width is between MD and LG breakpoints
 */
export const useTablet = (): boolean => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG);
    };

    checkIsTablet();
    window.addEventListener('resize', checkIsTablet);

    return () => window.removeEventListener('resize', checkIsTablet);
  }, []);

  return isTablet;
};

/**
 * Custom hook to detect desktop screen size
 * @returns {boolean} true if screen width is above LG breakpoint (1024px)
 */
export const useDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= BREAKPOINTS.LG);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return isDesktop;
};

/**
 * Custom hook to get current screen size category
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export const useScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.MD) {
        setScreenSize('mobile');
      } else if (width < BREAKPOINTS.LG) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenSize;
};
