import React, { useState, useEffect } from 'react';
import {
  Search,
  Command,
  Wrench,
  Wifi,
  Utensils,
  Calendar,
  Users,
  ShieldAlert,
  BookOpen,
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onNavigate, onOpenEmergency }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true); // Toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'emergency',
      title: '🚨 Emergency SOS & Helplines',
      sub: 'Ambulance, Security Main Gate, QRT, Warden',
      icon: <ShieldAlert size={18} color="var(--danger)" />,
      category: 'Emergency',
      handler: () => {
        onClose();
        onOpenEmergency();
      }
    },
    {
      id: 'complaint',
      title: '🔧 File Maintenance / LAN Ticket',
      sub: 'Report electrical, LAN, plumbing or carpentry issues',
      icon: <Wrench size={18} color="var(--h4-gold)" />,
      category: 'Utilities',
      handler: () => {
        onClose();
        onNavigate('utilities');
      }
    },
    {
      id: 'mess-menu',
      title: '🍽️ Check Today\'s Mess Menu',
      sub: 'Breakfast, Lunch, Tiffin, Dinner specials at Dr. Pramod Chaudhari Dining Hall',
      icon: <Utensils size={18} color="var(--h4-gold)" />,
      category: 'Mess',
      handler: () => {
        onClose();
        onNavigate('utilities');
      }
    },
    {
      id: 'lan-setup',
      title: '🌐 LAN & Wi-Fi Configuration Guides',
      sub: 'Proxy (netmon.iitb.ac.in), DNS (10.200.1.11), macOS/Linux/Windows steps',
      icon: <Wifi size={18} color="var(--iitb-cyan)" />,
      category: 'Network',
      handler: () => {
        onClose();
        onNavigate('utilities');
      }
    },
    {
      id: 'booking',
      title: '🏸 Reserve Sports Gear & Music Studio',
      sub: 'TT bats, badminton racquets, footballs, soundproof jamming studio',
      icon: <Calendar size={18} color="var(--h4-gold)" />,
      category: 'Booking',
      handler: () => {
        onClose();
        onNavigate('utilities');
      }
    },
    {
      id: 'council',
      title: '👥 Council Directory & Warden Contacts',
      sub: 'Warden, GSec, Maint Secy, Mess Secy, Cult, Tech, Sports',
      icon: <Users size={18} color="var(--text-primary)" />,
      category: 'Council',
      handler: () => {
        onClose();
        onNavigate('council');
      }
    },
    {
      id: 'resident-hub',
      title: '🏡 Resident Hub — Amenities & Soundboard',
      sub: 'Floor navigator, amenities map, and community soundboard',
      icon: <Users size={18} color="var(--text-primary)" />,
      category: 'Community',
      handler: () => {
        onClose();
        onNavigate('resident-hub');
      }
    },
    {
      id: 'about',
      title: '🏰 About Hostel 4 Lore & Chhichhore Heritage',
      sub: '60+ years legacy, Valfi traditions, General Championship glory',
      icon: <BookOpen size={18} color="var(--text-secondary)" />,
      category: 'Lore',
      handler: () => {
        onClose();
        onNavigate('about');
      }
    }
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.sub.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div
        className="modal-container"
        style={{
          maxWidth: '620px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <Search size={20} color="var(--h4-gold)" />
          <input
            type="text"
            placeholder="Type a command, service, room, or council role... (Press ESC to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              outline: 'none'
            }}
          />
          <kbd
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.75rem' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No matches found for "{query}".
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={item.handler}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-card)'
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                    </div>
                  </div>

                  <ArrowRight size={16} color="var(--text-muted)" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            background: 'var(--bg-subtle)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>Tip: Press <kbd style={{ padding: '0.1rem 0.3rem', borderRadius: '3px', background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>⌘K</kbd> anywhere to trigger Quick Jump</span>
          <span>Hostel 4 Digital Portal</span>
        </div>
      </div>
    </div>
  );
}
