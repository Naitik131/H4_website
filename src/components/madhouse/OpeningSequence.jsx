import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import H4Logo, { H4_LOGO_IMAGE } from '../common/H4Logo';
import { sound } from '../../utils/audioSynth';
import { useTheme } from '../../context/ThemeContext';

export default function OpeningSequence({ onComplete, logoImage = H4_LOGO_IMAGE }) {
  const { theme } = useTheme();
  const [phase, setPhase] = useState('center'); // 'center' -> 'moving' -> 'arrived' -> 'done'
  const [target, setTarget] = useState({ x: 0, y: 0, scale: 0.472 });
  // Quick manual tweak: horizontal pixel adjustment to nudge final landing (positive -> right)
  const MANUAL_X_ADJUST = 6;

  useEffect(() => {
    sound.playBeep(480);
    setTimeout(() => sound.playBeep(720), 300);

    const getTargetPos = () => {
      const el = document.getElementById('nav-brand-icon');
      if (el) {
        const rect = el.getBoundingClientRect();
        const startCenterX = window.innerWidth / 2;
        const startCenterY = window.innerHeight / 2;
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;

        let x = targetCenterX - startCenterX;
        const y = targetCenterY - startCenterY;
        const scale = rect.width / 72;
        // Apply manual horizontal nudge to compensate visible layout offsets
        x += MANUAL_X_ADJUST;
        console.debug('OpeningSequence: applied MANUAL_X_ADJUST', MANUAL_X_ADJUST);
        // Debug: report measured rect and computed target
        console.debug('OpeningSequence.getTargetPos', { rect, startCenterX, startCenterY, targetCenterX, targetCenterY, x, y, scale });

        return { x, y, scale };
      }

      // Safe responsive fallback
      const navPadding = window.innerWidth <= 640 ? 16 : 24;
      return {
        x: -(window.innerWidth / 2 - (navPadding + 17)),
        y: -(window.innerHeight / 2 - 32),
        scale: 34 / 72,
      };
    };

    // Calculate target on initial mount
    setTarget(getTargetPos());

    // Phase 1: Center stage hold (1.1s)
    const t1 = setTimeout(() => {
      setTarget(getTargetPos()); // Re-measure accurately right before moving
      setPhase('moving');
    }, 1100);

    // Phase 2: Movement completes at navbar position (2.35s)
    const t2 = setTimeout(() => {
      setPhase('arrived');
    }, 2350);

    // Phase 3: Done after fade out (3.2s)
    const t3 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 3200);

    const handleResize = () => {
      setTarget(getTargetPos());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  const isLight = theme === 'light';
  const overlayBg = isLight ? '#f7f6f3' : '#07090d';
  const titleColor = isLight ? 'rgba(10,12,16,0.92)' : '#ffffff';
  const subtitleShadow = isLight ? '0 2px 8px rgba(255,255,255,0.6)' : '0 2px 12px rgba(0,0,0,0.85)';
  // Remove decorative glow behind opening logo
  const boxShadow = 'none';
  const INITIAL_LOGO_SCALE = 3; // must match initial scale used in motion
  const LOGO_PX = 72;
  const movedTextTop = 'calc(50% + 54px)';
  const textYOffset = Math.round(LOGO_PX * INITIAL_LOGO_SCALE / 2 + 18) - 54; // positive -> move down when centered

  return (
    <AnimatePresence>
      <motion.div
        key="opening-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'arrived' ? 0 : 1 }}
        transition={{ duration: 0.85, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: overlayBg,
          pointerEvents: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Animated Logo Box — Centered at true viewport origin */}
          <motion.div
          initial={{ x: 0, y: 0, scale: 3, opacity: 1 }}
          animate={
            phase === 'center'
              ? { x: 0, y: 0, scale: 3, opacity: 1 }
              : {
                x: target.x,
                y: target.y,
                scale: target.scale,
                opacity: 1,
              }
          }
          transition={{
            duration: 1.25,
            ease: [0.16, 1, 0.3, 1], // Smooth physical deceleration
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-36px',
            marginLeft: '-36px',
            width: '72px',
            height: '72px',
            transformOrigin: 'center center',
              boxShadow,
            borderRadius: phase === 'center' ? '18px' : '8px',
            transition: 'border-radius 1.1s ease',
          }}
        >
          <H4Logo
            size={72}
            imageSrc={logoImage}
              borderRadius={phase === 'center' ? '18px' : '8px'}
              color={isLight ? 'var(--h4-bronze)' : 'var(--h4-gold)'}
            style={{
              width: '100%',
              height: '100%',
              boxShadow: 'none',
            }}
          />
        </motion.div>

        {/* Text Presentation — Sits right below center logo and is fully responsive on all screens */}
        <motion.div
          initial={{ opacity: 0, y: textYOffset + 15 }}
          animate={{
            opacity: phase === 'center' ? 1 : 0,
            y: phase === 'center' ? textYOffset : 0,
            scale: phase === 'center' ? 1 : 0.9,
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: movedTextTop,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 1rem',
            pointerEvents: 'none',
          }}
        >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 5.5vw, 2.2rem)',
                fontWeight: 900,
                color: titleColor,
                letterSpacing: '0.12em',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                textShadow: isLight ? 'none' : '0 4px 24px rgba(0,0,0,0.85)',
              }}
            >
              HOSTEL 4
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.68rem, 2.6vw, 0.82rem)',
                color: 'var(--h4-gold)',
                letterSpacing: '0.18em',
                marginTop: '0.35rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textShadow: subtitleShadow,
              }}
            >
              THE MADHOUSE • IIT BOMBAY
            </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
