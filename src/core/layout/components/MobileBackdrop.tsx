'use client';

import { MobileBackdrop as StyledMobileBackdrop } from './layout-styled-component';

interface MobileBackdropProps {
  isVisible: boolean;
  onClose: () => void;
}

export function MobileBackdrop({ isVisible, onClose }: MobileBackdropProps) {
  if (!isVisible) return null;

  return <StyledMobileBackdrop onClick={onClose} />;
}
