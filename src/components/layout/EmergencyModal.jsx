import React from 'react';
import {
  ShieldAlert,
  Phone,
  X,
  Ambulance,
  Building,
  Zap,
  HeartHandshake,
  Copy,
  PhoneCall
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../../data/councilData';

export default function EmergencyModal({ isOpen, onClose, onCopy }) {
  if (!isOpen) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Ambulance': return <Ambulance size={22} color="var(--danger)" />;
      case 'ShieldAlert': return <ShieldAlert size={22} color="var(--danger)" />;
      case 'PhoneCall': return <PhoneCall size={22} color="var(--h4-gold)" />;
      case 'Building': return <Building size={22} color="var(--info)" />;
      case 'Zap': return <Zap size={22} color="var(--warning)" />;
      case 'HeartHandshake': return <HeartHandshake size={22} color="var(--success)" />;
      default: return <Phone size={22} color="var(--text-primary)" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" style={{ color: 'var(--danger)' }}>
            <ShieldAlert size={26} />
            <span>Emergency Contacts & Helplines</span>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
            Immediate 24/7 assistance for medical emergencies, hostel security, infrastructure breakdowns, and student welfare at IIT Bombay.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {EMERGENCY_CONTACTS.map((item, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-card)'
                    }}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Category: {item.category}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a
                    href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`}
                    className="btn btn-sm btn-primary"
                    style={{ textDecoration: 'none', padding: '0.4rem 0.8rem' }}
                  >
                    <Phone size={14} />
                    <span>{item.phone}</span>
                  </a>
                  <button
                    className="btn-icon"
                    onClick={() => onCopy(item.phone, `${item.name} number copied!`)}
                    title="Copy number"
                  >
                    <Copy size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            📍 H4 Security Desk: Ground Floor Main Entrance
          </span>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
