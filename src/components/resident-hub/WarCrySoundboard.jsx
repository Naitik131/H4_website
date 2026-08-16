import React from 'react';
import {
  Volume2,
  Sparkles,
  Flame,
  Trophy,
  Copy,
  Music,
  Zap,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WarCrySoundboard({ onToast }) {
  const warCries = [
    {
      id: 'wc-1',
      title: 'The Madhouse Roar',
      subtitle: 'Official Inter-Hostel GC Cry',
      chant: 'Chaaro taraf ek hi shor — Hostel 4, The Madhouse Roar!',
      color: '#F59E0B',
      emoji: '🔥'
    },
    {
      id: 'wc-2',
      title: 'GC Glory Anthem',
      subtitle: 'Trophy Celebration Slogan',
      chant: 'Dil se Madhouse, Dimaag se IIT — H4 Forever, We Play to Win!',
      color: '#EA580C',
      emoji: '🏆'
    },
    {
      id: 'wc-3',
      title: 'Valfi Roast Ode',
      subtitle: 'Graduating Batch Anthem',
      chant: 'Char saal ki yaari, H4 ki deewangi — Madhouse chor ke hum kahan jayenge!',
      color: '#3B82F6',
      emoji: '🎓'
    },
    {
      id: 'wc-4',
      title: 'Midnight Canteen Chant',
      subtitle: '2:00 AM Hunger Slogan',
      chant: 'Chai garma-garam, Maggi lajawab — H4 Night Canteen, Sabka ustaad!',
      color: '#10B981',
      emoji: '☕'
    },
    {
      id: 'wc-5',
      title: 'Thunderclap Cheer',
      subtitle: 'Dramatics & PAF War Cry',
      chant: 'Hostel 4! *CLAP CLAP* Hostel 4! *CLAP CLAP* MADHOUSE!',
      color: '#8B5CF6',
      emoji: '⚡'
    }
  ];

  const playFanfare = (cry) => {
    // Confetti celebration
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65 },
      colors: [cry.color, '#FFB800', '#FFFFFF', '#F59E0B']
    });

    if (onToast) {
      onToast(`${cry.emoji} "${cry.title}" chant blasted across the Madhouse!`);
    }
  };

  const copyChant = (text, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    if (onToast) onToast('📋 Chant lyrics copied to clipboard!');
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            Madhouse War Cry & Spirit Soundboard
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Tap any war cry card to unleash the legendary cheers with confetti explosions!
          </p>
        </div>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
            if (onToast) onToast('🎉 Grand Madhouse Confetti Storm Triggered!');
          }}
        >
          <Sparkles size={16} />
          <span>Mega Confetti Storm</span>
        </button>
      </div>

      {/* Grid of War Cries */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {warCries.map((cry) => (
          <div
            key={cry.id}
            className="glass-card"
            style={{
              padding: '1.75rem',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: `1px solid ${cry.color}40`,
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => playFanfare(cry)}
          >
            {/* Top Row */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1.6rem' }}>{cry.emoji}</span>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>{cry.subtitle}</span>
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {cry.title}
              </h4>

              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: cry.color,
                  lineHeight: 1.4,
                  marginBottom: '1.25rem'
                }}
              >
                "{cry.chant}"
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
              <span className="btn btn-sm btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}>
                <Volume2 size={14} />
                <span>Roar It!</span>
              </span>

              <button
                className="btn-icon btn-sm"
                onClick={(e) => copyChant(cry.chant, e)}
                title="Copy Lyrics"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
