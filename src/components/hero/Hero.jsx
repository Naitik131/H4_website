import React from 'react';
import confetti from 'canvas-confetti';
import {
  Flame,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Command,
  Compass,
  Search,
  ExternalLink
} from 'lucide-react';
import BlurText from '../reactbits/BlurText';
import AnimatedCounter from '../reactbits/AnimatedCounter';
import SpotlightCard from '../reactbits/SpotlightCard';

export default function Hero({ onNavigate, onOpenEmergency, onOpenCommandPalette }) {
  const triggerCelebration = () => {
    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#F59E0B', '#E09F3E', '#D97706', '#2563EB', '#F8FAFC']
    });
  };

  return (
    <section id="hero" className="hero-section dot-grid-bg">
      <div className="container">
        <div className="hero-content">
          {/* Institutional Badge */}
          <div className="hero-pill">
            <span style={{ color: 'var(--h4-gold)' }}>●</span>
            <span>Indian Institute of Technology Bombay</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>Hostel 4 ("The Madhouse")</span>
          </div>

          {/* Animated Editorial Headline */}
          <h1 className="hero-title">
            <BlurText
              text="THE MADHOUSE"
              delay={0.06}
              animateBy="words"
              style={{ display: 'block', color: 'var(--text-primary)' }}
            />
            <span className="text-gold-accent">WHERE LEGENDS ARE FORGED</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-description">
            The central digital infrastructure for Hostel 4 residents, council, and alumni. Access maintenance tickets, gigabit LAN configuration, daily mess menus, room bookings, and council contacts.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              onClick={() => onNavigate('utilities')}
              className="btn btn-primary"
            >
              <span>Resident Utilities & Portals</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="btn btn-secondary"
            >
              <Compass size={16} />
              <span>Explore Ethos & Heritage</span>
            </button>

            <button
              onClick={onOpenCommandPalette}
              className="cmd-k-pill"
              title="Open Command Palette"
            >
              <Search size={14} />
              <span>Search portal...</span>
              <kbd style={{ fontSize: '0.72rem', padding: '0.1rem 0.35rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-card)', borderRadius: '3px' }}>
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Metrics Grid with Spotlight Cards & Animated Counters */}
          <div className="stats-grid">
            <SpotlightCard className="stat-card">
              <div className="stat-number">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <div className="stat-label">Inmates & Residents</div>
            </SpotlightCard>

            <SpotlightCard className="stat-card">
              <div className="stat-number">
                <AnimatedCounter value={15} suffix="+" />
              </div>
              <div className="stat-label">GC Championship Titles</div>
            </SpotlightCard>

            <SpotlightCard className="stat-card">
              <div className="stat-number">
                <AnimatedCounter value={65} suffix=" Yrs" />
              </div>
              <div className="stat-label">Heritage (Est. 1961)</div>
            </SpotlightCard>

            <SpotlightCard className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Active Community</div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
