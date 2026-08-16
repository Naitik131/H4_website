import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Wifi,
  BookOpen,
  Volume2,
  Flame,
  Radio
} from 'lucide-react';
import { sound } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export default function LivePulseRadar({ onToast }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerStadiumChant = () => {
    sound.playDrumBeat();
    setTimeout(() => sound.playFanfare(), 150);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#C5A880', '#F8FAFC', '#3B82F6']
    });
    if (onToast) onToast('Stadium War Cry Chanted Across the Quad!');
  };

  const getMessStatus = () => {
    const hours = time.getHours() + time.getMinutes() / 60;
    if (hours >= 7.5 && hours < 10) return 'Breakfast Service • Dr. Pramod Chaudhari Mess';
    if (hours >= 12 && hours < 14.5) return 'Lunch Feast • Dr. Pramod Chaudhari Mess';
    if (hours >= 16.5 && hours < 18) return 'Tiffin & Chai • Dining Hall';
    if (hours >= 19.5 && hours < 22) return 'Dinner Service Active';
    if (hours >= 22.5 || hours < 3.5) return 'Night Canteen Open (GF Quad)';
    return 'Dr. Pramod Chaudhari Mess (Clean & Prepped)';
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Radio size={16} color="var(--h4-gold)" className="animate-pulse" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
            MADHOUSE DAILY PULSE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>POWAI: {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span>
          <span style={{ color: 'var(--success)' }}>● ACTIVE</span>
        </div>
      </div>

      {/* Grid of Real-Time Micro Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Utensils size={13} color="var(--h4-gold)" />
            <span>Dining Hall</span>
          </div>
          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {getMessStatus()}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Wifi size={13} color="var(--iitb-blue)" />
            <span>Campus Network Gateway</span>
          </div>
          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Gigabit LAN &amp; Wi-Fi Access Points Active
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <BookOpen size={13} color="var(--success)" />
            <span>Reading Room (Wing C)</span>
          </div>
          <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            24/7 Silent Study Space &amp; Library Annex Open
          </div>
        </div>
      </div>

      {/* Interactive Sound Action Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-card)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Flame size={18} color="var(--h4-gold)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Hostel Spirit: <strong style={{ color: 'var(--text-primary)' }}>Unconquered</strong>
          </span>
        </div>

        <button
          onClick={triggerStadiumChant}
          className="btn btn-sm btn-primary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
        >
          <Volume2 size={13} />
          <span>Sound the Madhouse Cry</span>
        </button>
      </div>
    </div>
  );
}

