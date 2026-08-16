import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Move } from 'lucide-react';
import { sound } from '../../utils/audioSynth';

export default function DraggablePolaroids() {
  const containerRef = useRef(null);

  const polaroids = [
    {
      id: 'p1',
      title: 'GC Cult Winners 🏆',
      caption: 'Main Building Conquered',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400',
      initialRotate: -6,
      defaultX: 20,
      defaultY: 10
    },
    {
      id: 'p2',
      title: 'Chhichhore Spot 🎬',
      caption: 'Legendary Quadrangle',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400',
      initialRotate: 4,
      defaultX: 260,
      defaultY: 30
    },
    {
      id: 'p3',
      title: 'Valfi Roast Night 🎤',
      caption: 'Batch Farewell Slogans',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400',
      initialRotate: -3,
      defaultX: 500,
      defaultY: 15
    },
    {
      id: 'p4',
      title: '2:00 AM Maggi ☕',
      caption: 'Night Canteen Adda',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400',
      initialRotate: 5,
      defaultX: 740,
      defaultY: 25
    }
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '260px',
        overflow: 'hidden',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          <Camera size={13} color="var(--h4-gold)" />
          <span>Interactive Memory Polaroids (Drag & Toss)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <Move size={12} />
          <span>Grab & Move</span>
        </div>
      </div>

      <div style={{ position: 'relative', height: '200px' }}>
        {polaroids.map((p) => (
          <motion.div
            key={p.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.06, zIndex: 50 }}
            whileDrag={{ scale: 1.1, zIndex: 100 }}
            onDragStart={() => sound.playShutter()}
            initial={{ rotate: p.initialRotate, x: p.defaultX, y: p.defaultY }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '190px',
              background: '#fff',
              color: '#0a0c10',
              padding: '0.55rem 0.55rem 0.85rem',
              borderRadius: '3px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
              cursor: 'grab',
              userSelect: 'none'
            }}
          >
            <div style={{ width: '100%', height: '115px', overflow: 'hidden', borderRadius: '2px', background: '#222' }}>
              <img
                src={p.image}
                alt={p.title}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: '0.45rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', lineHeight: 1.1 }}>
                {p.title}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#555', marginTop: '0.15rem' }}>
                {p.caption}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
