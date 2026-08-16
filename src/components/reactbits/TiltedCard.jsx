import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
  style = {},
  onClick
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(yPct * -maxTilt);
    y.set(xPct * maxTilt);

    setGlarePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: mouseXSpring,
        rotateY: mouseYSpring,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        position: 'relative',
        ...style
      }}
      whileHover={{ scale }}
      transition={{ duration: 0.15 }}
      className={`tilted-card ${className}`}
    >
      {/* Subtle Specular Glare */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
            zIndex: 10
          }}
        />
      )}
      <div style={{ transform: 'translateZ(20px)', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
