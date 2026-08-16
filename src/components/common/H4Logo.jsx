import React from 'react';
import { Flame } from 'lucide-react';

/**
 * Global H4 Logo Asset Config
 * To use a real image logo (PNG/SVG/WebP), set H4_LOGO_IMAGE to the image path or import:
 * e.g., import logoImg from '../../assets/h4-logo.png'; export const H4_LOGO_IMAGE = logoImg;
 */
// Path to the H4 logo placed in the workspace `img/` folder.
export const H4_LOGO_IMAGE = '/img/h4_logo.png';

export default function H4Logo({
  size = 34,
  imageSrc = H4_LOGO_IMAGE,
  color = 'var(--h4-gold)',
  iconColor = '#000',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style = {},
  id = undefined
}) {
  if (imageSrc) {
    return (
      <img
        id={id}
        src={imageSrc}
        alt="Hostel 4 IIT Bombay Logo"
        className={className}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          display: 'block',
          ...style
        }}
      />
    );
  }

  return (
    <div
      id={id}
      className={`brand-icon-box ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius,
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style
      }}
    >
      <Flame size={Math.round(size * 0.58)} color={iconColor} fill={iconColor} />
    </div>
  );
}
