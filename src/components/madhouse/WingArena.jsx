import React, { useState, useEffect } from 'react';
import { Trophy, Vote, CheckCircle2, Flame, Shield } from 'lucide-react';
import { sound } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export default function WingArena({ onToast }) {
  const [votes, setVotes] = useState(() => {
    const saved = localStorage.getItem('h4_wing_votes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      'Wing A': 42,
      'Wing B': 58,
      'Wing C': 39,
      'Wing D': 47,
      'Wing E': 34
    };
  });

  const [hasVoted, setHasVoted] = useState(() => {
    return localStorage.getItem('h4_has_voted') === 'true';
  });

  const wings = [
    { name: 'Wing A', moniker: 'The Alphas', color: '#C5A880' },
    { name: 'Wing B', moniker: 'The Beasts', color: '#E09F3E' },
    { name: 'Wing C', moniker: 'The Cybernetics', color: '#3B82F6' },
    { name: 'Wing D', moniker: 'The Dynamos', color: '#10B981' },
    { name: 'Wing E', moniker: 'The New Wave', color: '#8B5CF6' }
  ];

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (wingName) => {
    if (hasVoted) {
      if (onToast) onToast('You have already pledged loyalty for this semester!');
      return;
    }

    const updated = { ...votes, [wingName]: votes[wingName] + 1 };
    setVotes(updated);
    setHasVoted(true);
    localStorage.setItem('h4_wing_votes', JSON.stringify(updated));
    localStorage.setItem('h4_has_voted', 'true');

    sound.playDrumBeat();
    setTimeout(() => sound.playFanfare(), 100);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    if (onToast) onToast(`🔥 Loyalty recorded for ${wingName}!`);
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--h4-gold)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            <Trophy size={13} />
            <span>Madhouse Intra-Hostel Arena</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800 }}>
            Wing Dominance Poll 2026
          </h3>
        </div>

        <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
          {totalVotes} Total Pledges
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {wings.map((wing) => {
          const count = votes[wing.name] || 0;
          const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

          return (
            <div
              key={wing.name}
              onClick={() => handleVote(wing.name)}
              className="glass-card"
              style={{
                padding: '0.85rem 1rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-xs)',
                cursor: hasVoted ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--border-card)'
              }}
            >
              {/* Progress Fill Background */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: `${percentage}%`,
                  background: 'rgba(255, 255, 255, 0.04)',
                  transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: 0
                }}
              />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{wing.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {wing.moniker}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--h4-gold)' }}>
                    {percentage}%
                  </span>
                  {!hasVoted && (
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{ padding: '0.2rem 0.55rem', fontSize: '0.7rem' }}
                    >
                      Pledge
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
