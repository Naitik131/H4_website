import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import defaultLogoImage from '../../../img/h4_logo.png';

/**
 * Global H4 Logo Asset Config
 * To use a real image logo (PNG/SVG/WebP), set H4_LOGO_IMAGE to an imported asset:
 * e.g., import logoImg from '../../assets/h4-logo.png'; export const H4_LOGO_IMAGE = logoImg;
 */
export const H4_LOGO_IMAGE = defaultLogoImage;

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
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageSrc]);

  if (imageSrc && !imageFailed) {
    return (
      <img
        id={id}
        src={imageSrc}
        alt="Hostel 4 IIT Bombay Logo"
        className={className}
        onError={() => setImageFailed(true)}
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
