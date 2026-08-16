import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({
  text = '',
  delay = 0.04,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  style = {}
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.1 * i }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 120
      }
    },
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      y: 16
    }
  };

  return (
    <motion.div
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: animateBy === 'words' ? '0.35em' : '0.02em', ...style }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {elements.map((element, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: 'inline-block' }}
        >
          {element === ' ' ? '\u00A0' : element}
        </motion.span>
      ))}
    </motion.div>
  );
}
