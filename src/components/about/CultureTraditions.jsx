import React from 'react';
import {
  Flame,
  Volume2,
  Sparkles,
  Trophy,
  Coffee,
  Heart,
  Smile,
  Music
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CultureTraditions({ onToast }) {
  const traditions = [
    {
      title: "Valfi: The Legendary Valedictory Function",
      icon: <Smile size={24} color="var(--h4-gold)" />,
      badge: "Annual Rite of Passage",
      description: "A night of unfiltered humor, emotional farewells, and witty batch superlatives where graduating seniors are honored and playfully roasted by their juniors before stepping into the world."
    },
    {
      title: "GC War Cries & Championship Fever",
      icon: <Trophy size={24} color="var(--iitb-blue-light)" />,
      badge: "Unbroken Spirit",
      description: "When the floodlights turn on at the Gymkhana grounds, the Madhouse army gathers with drums, megaphones, and deafening cheers to propel H4 athletes and artists to victory."
    },
    {
      title: "Midnight Canteen & Quad Brainstorms",
      icon: <Coffee size={24} color="var(--warning)" />,
      badge: "2:00 AM Conversations",
      description: "From debugging complex code to sketching out multi-million dollar startup ideas over hot chai and Maggi, the quadrangle never sleeps."
    },
    {
      title: "H4 Gala Dinners & Traditional Nights",
      icon: <Sparkles size={24} color="var(--danger)" />,
      badge: "Festive Grandeur",
      description: "Spectacular multi-course feasts in the Dr. Pramod Chaudhari Mess, vibrant ethnic attires, acoustic musical performances, and dhol circles."
    }
  ];

  const chants = [
    {
      name: "The H4 Thunder Roar",
      text: "Chaaro taraf ek hi shor — Hostel 4, The Madhouse Roar!",
      context: "Chanted during GC Finals and Inter-Hostel Trophy celebrations."
    },
    {
      name: "The Unconquered Anthem",
      text: "Dil se Madhouse, Dimaag se IIT — H4 Forever, We Play to Win!",
      context: "Chanted at the initiation of freshers and cultural galas."
    }
  ];

  const triggerChantCelebrate = (chant) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#FFB800', '#EA580C', '#2563EB']
    });
    if (onToast) {
      onToast(`🔥 "${chant.name}" unleashed with Madhouse pride!`);
    }
  };

  return (
    <section className="section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Madhouse Culture</span>
          </div>
          <h2 className="section-title">Traditions That Define Us</h2>
          <p className="section-subtitle">
            Beyond academics and research, these timeless traditions form the soul of every inmate who walks through our gates.
          </p>
        </div>

        {/* 4 Traditions Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          {traditions.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-card)'
                  }}
                >
                  {item.icon}
                </div>
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>{item.badge}</span>
              </div>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Chants Showcase Box */}
        <div
          className="glass-card"
          style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(37, 99, 235, 0.05) 100%)',
            border: '1px solid var(--border-glow)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--h4-gold)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Volume2 size={16} />
              <span>War Cries & Chants</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800 }}>
              The Madhouse Slogans
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Click on any chant to unleash the spirit with celebration fanfare!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {chants.map((chant, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--bg-elevated)',
                  cursor: 'pointer'
                }}
                onClick={() => triggerChantCelebrate(chant)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--h4-gold)' }}>
                      {chant.name}
                    </span>
                    <Volume2 size={18} color="var(--h4-gold)" />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                      marginBottom: '0.85rem'
                    }}
                  >
                    "{chant.text}"
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                  <span>{chant.context}</span>
                  <span className="btn btn-sm btn-primary" style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}>
                    Chant!
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
