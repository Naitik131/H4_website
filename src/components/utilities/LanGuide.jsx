import React, { useState } from 'react';
import {
  Wifi,
  Copy,
  Check,
  Monitor,
  Laptop,
  Terminal,
  Smartphone,
  BookOpen,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { NETWORK_CONFIG, OS_LAN_GUIDES, HOSTEL_RULES_DATA } from '../../data/guidesData';

export default function LanGuide({ onToast }) {
  const [activeOS, setActiveOS] = useState('windows');
  const [activeSubTab, setActiveSubTab] = useState('guides'); // 'guides' or 'rules'
  const [copiedKey, setCopiedKey] = useState(null);

  const copyValue = (val, keyLabel) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(keyLabel);
    if (onToast) onToast(`📋 Copied: ${val}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentGuide = OS_LAN_GUIDES.find((g) => g.id === activeOS);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header & Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            Network Setup & Hostel Guidelines
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            High-speed gigabit LAN configuration, IITB-Wireless Wi-Fi settings, and resident bylaws.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveSubTab('guides')}
            className={`tab-btn ${activeSubTab === 'guides' ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
          >
            <Wifi size={15} />
            <span>LAN / Wi-Fi Guides</span>
          </button>
          <button
            onClick={() => setActiveSubTab('rules')}
            className={`tab-btn ${activeSubTab === 'rules' ? 'active' : ''}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
          >
            <BookOpen size={15} />
            <span>Hostel Rules & Bylaws</span>
          </button>
        </div>
      </div>

      {/* QUICK COPY TOKENS ROW */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div className="glass-card" style={{ padding: '1rem', background: 'var(--bg-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Proxy Host & Port
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <code style={{ fontSize: '0.9rem', color: 'var(--h4-gold)' }}>netmon.iitb.ac.in:80</code>
            <button
              className="btn-icon btn-sm"
              onClick={() => copyValue('netmon.iitb.ac.in', 'Proxy Host')}
              title="Copy Proxy"
            >
              {copiedKey === 'Proxy Host' ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem', background: 'var(--bg-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Primary DNS Server
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <code style={{ fontSize: '0.9rem', color: 'var(--h4-gold)' }}>10.200.1.11</code>
            <button
              className="btn-icon btn-sm"
              onClick={() => copyValue('10.200.1.11', 'Primary DNS')}
              title="Copy DNS"
            >
              {copiedKey === 'Primary DNS' ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem', background: 'var(--bg-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Secondary DNS Server
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <code style={{ fontSize: '0.9rem', color: 'var(--h4-gold)' }}>10.200.1.12</code>
            <button
              className="btn-icon btn-sm"
              onClick={() => copyValue('10.200.1.12', 'Secondary DNS')}
              title="Copy Secondary DNS"
            >
              {copiedKey === 'Secondary DNS' ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem', background: 'var(--bg-subtle)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            Automatic PAC Script
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <code style={{ fontSize: '0.85rem', color: 'var(--h4-gold)' }}>ldap.pac</code>
            <button
              className="btn-icon btn-sm"
              onClick={() => copyValue('http://www.cc.iitb.ac.in/ldap.pac', 'PAC URL')}
              title="Copy PAC URL"
            >
              {copiedKey === 'PAC URL' ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: OS SETUP GUIDES */}
      {activeSubTab === 'guides' && (
        <div>
          {/* OS Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {OS_LAN_GUIDES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveOS(g.id)}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: activeOS === g.id ? 'var(--h4-gold)' : 'var(--bg-subtle)',
                  color: activeOS === g.id ? '#000' : 'var(--text-primary)',
                  border: activeOS === g.id ? '1px solid var(--h4-gold)' : '1px solid var(--border-card)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              >
                {g.id === 'windows' && <Monitor size={18} />}
                {g.id === 'macos' && <Laptop size={18} />}
                {g.id === 'linux' && <Terminal size={18} />}
                {g.id === 'mobile' && <Smartphone size={18} />}
                <span>{g.os}</span>
              </button>
            ))}
          </div>

          {/* Active Guide Content */}
          {currentGuide && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Step-by-Step Configuration: {currentGuide.os}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {currentGuide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      gap: '1.25rem',
                      padding: '1.25rem',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--warning-bg)',
                        color: 'var(--h4-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        flexShrink: 0,
                        border: '1px solid var(--border-glow)'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {step.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Troubleshooting Card */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem'
                }}
              >
                <HelpCircle size={20} color="var(--h4-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>Troubleshooting & Diagnostics: </strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    {currentGuide.troubleshooting}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-VIEW 2: HOSTEL RULES & BYLAWS */}
      {activeSubTab === 'rules' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {HOSTEL_RULES_DATA.map((ruleSec, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem', background: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <ShieldCheck size={20} color="var(--h4-gold)" />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700 }}>
                  {ruleSec.category}
                </h4>
              </div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {ruleSec.items.map((item, iIdx) => (
                  <li key={iIdx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Quick Links Footer */}
      <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
          <span>IITB Computer Centre (CC)</span>
          <span>•</span>
          <span>Web & Tech Council, H4</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a
            href="https://internet.iitb.ac.in"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--h4-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}
          >
            <span>Internet Login Portal</span>
            <ExternalLink size={14} />
          </a>
          <a
            href="https://campreg.iitb.ac.in"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--h4-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}
          >
            <span>Campreg MAC Register</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
