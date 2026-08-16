import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export const H4_TIMELINE_EVENTS = [
  {
    year: '1961',
    period: 'Foundation & Genesis',
    title: 'The Inception of Hostel 4',
    accentColor: '#C5A880',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600',
    desc: 'When IIT Bombay was declared an Institute of National Importance, Hostel 4 opened its doors on the lush green shores of Powai Lake, welcoming its earliest batches of pioneering engineers.',
    detail: 'From day one, the hostel developed an organic, freewheeling identity that distinguished it from every other residence on campus.',
    stat: { label: 'Year Founded', value: '1961' }
  },
  {
    year: '1971',
    period: 'The Golden Era',
    title: 'Birth of "The Madhouse" Spirit',
    accentColor: '#E8B86D',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600',
    desc: 'The moniker "The Madhouse" was cemented in campus lore. From midnight philosophical debates in the quadrangle to GC dominance across every discipline, H4 became synonymous with unbridled grit.',
    detail: 'Dr. Pramod Chaudhari (B.Tech 1971, Founder of Praj Industries) resided in H4 during this legendary decade.',
    stat: { label: 'Legacy Decade', value: '1971' }
  },
  {
    year: '1998',
    period: 'Literature & Folklore',
    title: 'True Stories of Inmates',
    accentColor: '#A8C5C0',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1600',
    desc: 'The eccentric, hilarious, and heartwarming stories of Hostel 4 residents were officially compiled and published — four decades of pranks, brilliance, hostel court sessions, and unbreakable brotherhood.',
    detail: '"Madhouse: True Stories of the Inmates of Hostel 4" edited by Urmilla Deshpande.',
    stat: { label: 'Published', value: '1998' }
  },
  {
    year: '2019',
    period: 'Cinema & Pop Culture',
    title: 'Nitesh Tiwari & Chhichhore',
    accentColor: '#C5A880',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1600',
    desc: 'IIT Bombay alumnus and H4 inmate Nitesh Tiwari directed the National Award-winning blockbuster "Chhichhore", drawing directly on his hostel life — GC rivalries, late-night study rooms, and the philosophy that losers can win.',
    detail: 'Scenes and key elements of the film were inspired by the authentic corridors, quadrangle, and dining hall banter of Hostel 4.',
    stat: { label: 'National Award', value: '2020' }
  },
  {
    year: '2026',
    period: 'New Era & Reconstruction',
    title: 'The Grand Rebuild',
    accentColor: '#8DC5A8',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600',
    desc: 'IIT Bombay completed the grand reconstruction of Hostel 4 — inaugurating the state-of-the-art Dr. Pramod Chaudhari Dining Hall, IIT Bombay\'s largest dining facility with 800+ capacity.',
    detail: 'Smart Wi-Fi 6, soundproof music studios, gymnasiums, and modern residential wings — yet the Madhouse soul lives on.',
    stat: { label: 'Mess Capacity', value: '800+' }
  }
];

// Word-by-word text reveal animation
function RevealText({ text, delay = 0, style = {} }) {
  const words = text.split(' ');
  return (
    <span style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Individual slide — hooks called at top level of this component
function TimelineSlide({ event, index, total, scrollYProgress }) {
  const step = 1 / total;
  const start = index * step;
  const peakStart = start + step * 0.15;
  const peakEnd = start + step * 0.85;
  const end = (index + 1) * step;

  const opacity = useTransform(
    scrollYProgress,
    index === 0 ? [0, peakEnd, end] : [start, peakStart, peakEnd, end],
    index === 0 ? [1, 1, 0] : [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    index === 0 ? [0, peakEnd, end] : [start, peakStart, peakEnd, end],
    index === 0 ? [1, 1, 1.04] : [0.94, 1, 1, 1.04]
  );
  const blur = useTransform(
    scrollYProgress,
    index === 0 ? [0, peakEnd, end] : [start, peakStart, peakEnd, end],
    index === 0 ? ['blur(0px)', 'blur(0px)', 'blur(6px)'] : ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']
  );
  const imgParallax = useTransform(
    scrollYProgress,
    index === 0 ? [0, peakEnd] : [start, peakEnd],
    ['0%', '-8%']
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        scale,
        filter: blur,
        willChange: 'opacity, transform, filter',
        pointerEvents: 'none'
      }}
    >
      {/* Full-bleed Background Image with Parallax */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          y: imgParallax,
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* Deep atmospheric gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(to right, rgba(5,6,10,0.97) 0%, rgba(5,6,10,0.85) 55%, rgba(5,6,10,0.35) 100%),
          linear-gradient(to top, rgba(5,6,10,0.7) 0%, transparent 40%)
        `,
        zIndex: 1
      }} />

      {/* Massive ghost year watermark */}
      <div style={{
        position: 'absolute',
        right: '-2rem',
        bottom: '-3rem',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(12rem, 22vw, 20rem)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: `1px rgba(197,168,128,0.08)`,
        letterSpacing: '-0.05em',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 2
      }}>
        {event.year}
      </div>

      {/* Content Layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(2rem, 5vw, 5rem) clamp(1.5rem, 6vw, 8rem)',
        maxWidth: '900px',
        pointerEvents: 'auto'
      }}>
        <div style={{ width: '100%' }}>
          {/* Period badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.5rem'
            }}
          >
            <span style={{
              width: '2.5rem',
              height: '2px',
              background: event.accentColor,
              display: 'block',
              borderRadius: '2px'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: event.accentColor,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 600
            }}>
              {event.period}
            </span>
          </motion.div>

          {/* Giant year number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 14vw, 11rem)',
              fontWeight: 900,
              color: event.accentColor,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              marginBottom: '1.5rem',
              textShadow: `0 0 80px ${event.accentColor}33`
            }}
          >
            {event.year}
          </motion.div>

          {/* Title */}
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            maxWidth: '700px'
          }}>
            <RevealText text={event.title} delay={0.3} />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.75,
              maxWidth: '620px',
              marginBottom: '2rem'
            }}
          >
            {event.desc}
          </motion.p>

          {/* Context callout */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              maxWidth: '560px'
            }}
          >
            <span style={{
              width: '3px',
              minHeight: '100%',
              background: `linear-gradient(to bottom, ${event.accentColor}, transparent)`,
              borderRadius: '2px',
              flexShrink: 0,
              alignSelf: 'stretch',
              minHeight: '2rem'
            }} />
            <p style={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.65,
              fontStyle: 'italic'
            }}>
              {event.detail}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Scroll progress bar
function ProgressBar({ scrollYProgress }) {
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(197, 168, 128, 0.9)',
        scaleX,
        transformOrigin: '0%',
        zIndex: 100
      }}
    />
  );
}

// Active event tracker — shows which milestone is active
function SideNav({ scrollYProgress, total }) {
  return (
    <div style={{
      position: 'absolute',
      right: 'clamp(1rem, 3vw, 2.5rem)',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 50
    }}>
      {H4_TIMELINE_EVENTS.map((evt, idx) => {
        const step = 1 / total;
        const mid = (idx + 0.5) * step;
        return (
          <ActiveDot key={evt.year} scrollYProgress={scrollYProgress} stepMid={mid} step={step} label={evt.year} color={evt.accentColor} />
        );
      })}
    </div>
  );
}

function ActiveDot({ scrollYProgress, stepMid, step, label, color }) {
  const size = useTransform(scrollYProgress, [stepMid - step * 0.5, stepMid, stepMid + step * 0.5], [6, 14, 6]);
  const opacity = useTransform(scrollYProgress, [stepMid - step * 0.5, stepMid, stepMid + step * 0.5], [0.3, 1, 0.3]);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
      <motion.span style={{
        fontSize: '0.68rem',
        fontFamily: 'var(--font-mono)',
        color,
        opacity,
        fontWeight: 700
      }}>
        {label}
      </motion.span>
      <motion.div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        opacity,
        boxShadow: `0 0 10px ${color}66`
      }} />
    </div>
  );
}

export default function HistoryTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const total = H4_TIMELINE_EVENTS.length;

  return (
    <div ref={containerRef} style={{ position: 'relative', height: `${total * 100}vh` }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#05060a'
      }}>
        {/* Gradient progress bar at top */}
        <ProgressBar scrollYProgress={scrollYProgress} />

        {/* Side navigation dots */}
        <SideNav scrollYProgress={scrollYProgress} total={total} />

        {/* All slides stacked — each handles its own scroll-linked opacity */}
        {H4_TIMELINE_EVENTS.map((event, index) => (
          <TimelineSlide
            key={event.year}
            event={event}
            index={index}
            total={total}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Bottom scroll hint — only on first view */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 50,
            pointerEvents: 'none'
          }}
        >
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(197,168,128,0.6), transparent)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
