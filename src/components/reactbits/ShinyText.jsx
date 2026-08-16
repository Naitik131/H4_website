import React from 'react';

export default function ShinyText({
  text = '',
  disabled = false,
  speed = 4,
  className = '',
  style = {}
}) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        display: 'inline-block',
        background: 'var(--shiny-text-gradient, linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.4) 100%))',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`,
        ...style
      }}
    >
      {text}
      <style>{`
        @keyframes shine {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </span>
  );
}
