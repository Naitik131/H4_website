import React from 'react';
import {
  Flame,
  Award,
  Sparkles,
  Film,
  Building2,
  Heart,
  Users,
  Compass,
  Trophy,
  ShieldCheck
} from 'lucide-react';
import SpotlightCard from '../reactbits/SpotlightCard';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Trophy size={22} color="var(--h4-gold)" />,
      title: "General Championship Titans",
      desc: "Perennial podium finishers across Cult, Tech, and Sports GCs. From night football finals to dramatics and hackathon sprints, H4 competes with pure grit."
    },
    {
      icon: <Film size={22} color="var(--iitb-cyan)" />,
      title: "The Chhichhore Heritage",
      desc: "Hostel 4's rustic corridors, iconic central quadrangle, and brotherhood served as the real-world muse and filming ground for the Bollywood film 'Chhichhore'."
    },
    {
      icon: <Building2 size={22} color="var(--success)" />,
      title: "Modernised Living Quarters",
      desc: "Reconstructed building featuring IIT Bombay's largest dining facility—the Dr. Pramod Chaudhari Mess—along with air-conditioned study rooms, gym, and soundproof studios."
    },
    {
      icon: <Heart size={22} color="var(--danger)" />,
      title: "Valfi & Inmate Camaraderie",
      desc: "Home to cherished rites of passage: the annual Valfi farewell roast, midnight canteen addas, and an alumni network spanning over six decades."
    }
  ];

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Flame size={13} />
            <span>Legacy & Ethos</span>
          </div>
          <h2 className="section-title">The Legend of the Madhouse</h2>
          <p className="section-subtitle">
            More than concrete and corridors—Hostel 4 is an emotion, a crucible of lifelong friendships, and a benchmark of cultural and sporting prowess at IIT Bombay.
          </p>
        </div>

        {/* Story Section */}
        <SpotlightCard
          style={{
            padding: '2.5rem',
            marginBottom: '3rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--h4-gold)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                <span>● Established 1961 • IIT Bombay</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.2rem', lineHeight: 1.15 }}>
                Where Passion Meets Camaraderie
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.98rem' }}>
                Known across the campus as <strong>"The Madhouse"</strong>, Hostel 4 has fostered a distinctive culture of relentless energy, fierce GC loyalty, and intellectual curiosity. It is a home where juniors find mentors, batchmates form startups, and every resident leaves a mark on the hostel's tapestry.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                Whether jamming in the basement music room, coding late into the night in Wing D, or sharing tea in the quadrangle, every moment in H4 is authentic and memorable.
              </p>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-card)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=900"
                alt="Hostel 4 Quadrangle and Architecture"
                style={{ width: '100%', height: '340px', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem 1.25rem',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(10, 12, 16, 0.95) 100%)',
                  color: '#fff'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: 'var(--font-heading)' }}>Central Quadrangle & Walkways</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--h4-gold)', fontFamily: 'var(--font-mono)' }}>Hostel 4, Indian Institute of Technology Bombay</div>
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* 4 Pillars Grid with Spotlight Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {pillars.map((pillar, idx) => (
            <SpotlightCard key={idx} style={{ padding: '1.75rem 1.5rem', background: 'var(--bg-subtle)' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.15rem',
                  border: '1px solid var(--border-card)'
                }}
              >
                {pillar.icon}
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {pillar.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {pillar.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
