import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wrench,
  Utensils,
  Users,
  ArrowRight,
  Search,
  Bell,
  Flame,
  Radio,
  Camera,
  Activity
} from 'lucide-react';
import BlurText from '../components/reactbits/BlurText';
import ShinyText from '../components/reactbits/ShinyText';
import DecryptedText from '../components/reactbits/DecryptedText';
import AnimatedCounter from '../components/reactbits/AnimatedCounter';
import TiltedCard from '../components/reactbits/TiltedCard';
import Particles from '../components/reactbits/Particles';
import Magnet from '../components/reactbits/Magnet';
import AutoScrollGallery from '../components/madhouse/AutoScrollGallery';
import LivePulseRadar from '../components/madhouse/LivePulseRadar';
import DraggablePolaroids from '../components/madhouse/DraggablePolaroids';
import WingArena from '../components/madhouse/WingArena';
import { NOTICES_DATA } from '../data/noticesData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
});

const viewFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function HomePage({ onOpenCommandPalette, onOpenAllNotices, onToast }) {
  const recentNotices = NOTICES_DATA.slice(0, 3);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      {/* ── 1. HERO ── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          padding: '4rem 0',
          backgroundImage: 'var(--hero-overlay), url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.4s ease'
        }}
      >
        <Particles particleCount={36} speed={0.3} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Liquid Glass Box Container — adapts automatically to theme and blurs background image */}
          <div
            className="hero-content liquid-glass-box"
            style={{
              padding: '3rem',
              maxWidth: '880px',
              margin: '0 auto'
            }}
          >

            {/* Headline — M drops from above like it fell off */}
            <motion.h1 {...fadeUp(0.12)} className="hero-title">
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem', color: 'var(--text-primary)' }}>
                <span>THE</span>
                <span style={{ display: 'inline-flex', alignItems: 'baseline', color: 'var(--h4-gold)', overflow: 'visible' }}>
                  <motion.span
                    initial={{ y: -120, rotate: -35, opacity: 0 }}
                    animate={{ y: 6, rotate: 14, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.7, type: 'spring', stiffness: 200, damping: 12, mass: 1.2 }}
                    style={{ display: 'inline-block', transformOrigin: 'top left', color: 'var(--h4-gold)' }}
                  >
                    M
                  </motion.span>
                  <span>ADHOUSE</span>
                </span>
              </div>
              <ShinyText text="WHERE LEGENDS ARE FORGED" speed={5} />
            </motion.h1>

            <motion.p {...fadeUp(0.22)} className="hero-description">
              Welcome to the official digital home of Hostel 4, IIT Bombay. Explore our history, check dining schedules, connect with the council, and experience the legendary Madhouse culture.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="hero-cta-group">
              <Magnet strength={0.3} radius={70}>
                <Link to="/utilities" className="btn btn-primary">
                  <span>Explore Services</span>
                  <ArrowRight size={14} />
                </Link>
              </Magnet>
              <Magnet strength={0.25} radius={70}>
                <Link to="/about" className="btn btn-secondary">
                  <span>Ethos &amp; Legacy</span>
                </Link>
              </Magnet>
              <button onClick={onOpenCommandPalette} className="cmd-k-pill">
                <Search size={13} />
                <span>Search Website</span>
                <kbd style={{ fontSize: '0.68rem', padding: '0.1rem 0.35rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-card)', borderRadius: '3px' }}>⌘K</kbd>
              </button>
            </motion.div>

            {/* Metric strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginTop: '2.5rem' }}
            >
              {[
                { value: 500, suffix: '+', label: 'Residents', color: 'var(--text-primary)' },
                { value: 15, suffix: '+', label: 'GC Trophies', color: 'var(--text-primary)' },
                { value: 65, suffix: ' Yrs', label: 'Est. 1961', color: 'var(--text-primary)' },
                { value: null, display: '24/7', label: 'Community', color: 'var(--h4-gold)' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="glass-card"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                  style={{ padding: '1.15rem 0.5rem', textAlign: 'center' }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, color: m.color, lineHeight: 1, marginBottom: '0.2rem' }}>
                    {m.value != null ? <AnimatedCounter value={m.value} suffix={m.suffix} /> : m.display}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── 2. AUTO-SCROLL GALLERY ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}
      >
        <AutoScrollGallery />
      </motion.section>

      {/* ── 3. BENTO ESSENTIAL ACCESS ── */}
      <section style={{ padding: '4rem 0 3.5rem' }}>
        <div className="container">
          <motion.div
            className="section-header"
            variants={viewFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0}
          >
            <span className="section-tag">Quick Links</span>
            <h2 className="section-title">Life at the Madhouse</h2>
            <p className="section-subtitle">
              Everything you need to navigate everyday life in Hostel 4, from dining menus to council contacts.
            </p>
          </motion.div>

          <div className="bento-grid">
            {[
              {
                to: '/utilities',
                icon: <Wrench size={18} />,
                title: 'Student Services & Support',
                desc: 'File maintenance requests directly to Google Sheets, configure campus Wi-Fi networks, and get technical help.',
                cta: 'Get Assistance'
              },
              {
                to: '/utilities',
                icon: <Utensils size={18} />,
                title: 'Dining & Nutrition',
                desc: 'Review the weekly mess schedule, check live highlights of daily meals, and access the rebate estimator.',
                cta: 'Check Dining Options'
              },
              {
                to: '/council',
                icon: <Users size={18} />,
                title: 'Hostel Leadership',
                desc: 'Meet our wardens and the student council members coordinating welfare, cultural fests, and sports leagues.',
                cta: 'Connect with Representatives'
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={viewFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i * 0.5}
              >
                <TiltedCard maxTilt={7}>
                  <Link to={card.to} className="bento-card" style={{ height: '100%' }}>
                    <div>
                      <div className="bento-icon">{card.icon}</div>
                      <h3 className="bento-title">{card.title}</h3>
                      <p className="bento-desc">{card.desc}</p>
                    </div>
                    <div className="bento-link">
                      <span>{card.cta}</span>
                      <ArrowRight size={13} />
                    </div>
                  </Link>
                </TiltedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LIVE RADAR + WING ARENA + DRAGGABLE POLAROIDS ── */}
      <section style={{ padding: '0 0 4.5rem' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}
          >
            <LivePulseRadar onToast={onToast} />
            <WingArena onToast={onToast} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <DraggablePolaroids />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
