import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Film,
  Building2,
  Heart,
  Trophy,
} from 'lucide-react';
import HistoryTimeline from '../components/madhouse/HistoryTimeline';
import Gallery from '../components/about/Gallery';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const pillars = [
    {
      icon: <Trophy size={20} color="var(--h4-gold)" />,
      title: "General Championship Titans",
      desc: "Perennial podium contenders across Cult, Tech, and Sports GCs. From high-intensity football matches to dramatics and hackathon sprints, H4 competes with pure grit."
    },
    {
      icon: <Film size={20} color="var(--iitb-blue)" />,
      title: "The Chhichhore Connection",
      desc: "Hostel 4's rustic charisma, iconic quadrangle, and infectious brotherhood served as the real-world muse and filming location for the Bollywood film 'Chhichhore', directed by H4 alumnus Nitesh Tiwari."
    },
    {
      icon: <Building2 size={20} color="var(--success)" />,
      title: "2026 Grand Reconstruction",
      desc: "Rebuilt with state-of-the-art residential infrastructure, featuring IIT Bombay's largest dining facility—the Dr. Pramod Chaudhari Mess (800+ capacity)—along with smart labs, gym, and soundproof music studios."
    },
    {
      icon: <Heart size={20} color="var(--danger)" />,
      title: "Valfi & Inmate Camaraderie",
      desc: "Home to cherished hostel rites of passage: the annual Valfi (Valedictory Function roast), midnight quad discussions, and an alumni network spanning six decades."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="page-wrapper dot-grid-bg"
    >
      {/* Scroll-Interactive Hero Header — inside container */}
      <div className="container">
        <motion.div
          ref={heroRef}
          style={{ scale: heroScale, opacity: heroOpacity, transformOrigin: 'top center' }}
        >
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="section-tag">Legacy &amp; Chronicle</span>
            <h1 className="section-title">
              <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                <motion.span
                  initial={{ y: -100, rotate: -28, opacity: 0 }}
                  animate={{ y: 5, rotate: 12, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 190, damping: 13, mass: 1.1 }}
                  style={{ display: 'inline-block', transformOrigin: 'top left', color: 'var(--h4-gold)' }}
                >
                  H
                </motion.span>
                <span>istory &amp; Ethos of Hostel 4</span>
              </span>
            </h1>
            <p className="section-subtitle">
              From its founding in 1961 on the shores of Powai Lake to its grand 2026 reconstruction—explore the 65-year chronicle of IIT Bombay's most legendary residence.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* 1. FULL-VIEWPORT CINEMATIC TIMELINE — outside container, edge-to-edge */}
      <HistoryTimeline />

      <div className="container">

        {/* 2. THE RECONSTRUCTION OF 2026 HIGHLIGHT BOX */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={2}
          className="glass-card"
          style={{
            padding: '2.5rem',
            marginBottom: '3.5rem',
            background: 'var(--bg-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--h4-gold)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Campus Transformation Milestone
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
              The Rebuilt Madhouse: Modernised for Tomorrow
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.92rem' }}>
              In December 2025 – 2026, IIT Bombay officially unveiled the completely reconstructed Hostel 4 complex. Enabled by philanthropic support from distinguished alumnus <strong>Dr. Pramod Chaudhari (B.Tech 1971, Praj Industries)</strong>, who resided in H4 during his own undergraduate years.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              The complex features the <strong>Dr. Pramod Chaudhari Dining Hall</strong>—the largest dining facility on campus with seating for over 800 residents—engineered with sustainable architecture, acoustic treatment, and modern amenities while preserving the timeless soul of the Madhouse.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span className="badge badge-gold">800+ Seating Mess</span>
              <span className="badge badge-gold">Smart Wi-Fi 6 Backbone</span>
              <span className="badge badge-gold">Soundproof Studio</span>
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-card)' }}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=900"
              alt="Dr. Pramod Chaudhari Dining Hall at Hostel 4"
              style={{ width: '100%', height: '320px', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        {/* 3. FOUR PILLARS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={3}
          style={{ marginBottom: '4rem' }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Hostel Ethos &amp; Pillars
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={idx * 0.5}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="glass-card"
                style={{ padding: '1.5rem', background: 'var(--bg-subtle)' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid var(--border-card)' }}>
                  {pillar.icon}
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  {pillar.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4. CURATED PHOTO GALLERY */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={0}
        >
          <Gallery />
        </motion.div>
      </div>
    </motion.div>
  );
}
