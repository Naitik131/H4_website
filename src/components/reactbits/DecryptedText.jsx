import React, { useEffect, useState, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=';

export default function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 12,
  className = '',
  parentClassName = '',
  animateOn = 'view', // 'view' or 'hover'
  revealDirection = 'start',
  sequential = true,
  style = {}
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let iteration = 0;

    const startAnimation = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (sequential) {
                if (index < iteration) {
                  return text[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              } else {
                if (Math.random() < iteration / maxIterations) {
                  return text[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              }
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }

        iteration += 1 / (maxIterations / (text.length || 1));
      }, speed);
    };

    if (animateOn === 'view' && !hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            setHasAnimated(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }

    if (animateOn === 'hover' && isHovered) {
      startAnimation();
    }

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, isHovered, animateOn, hasAnimated, sequential]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => animateOn === 'hover' && setIsHovered(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovered(false)}
      className={`decrypted-text ${parentClassName}`}
      style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums', ...style }}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
