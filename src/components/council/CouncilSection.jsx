import React, { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Shield,
  ExternalLink,
  Copy,
  ShieldAlert
} from 'lucide-react';
import { COUNCIL_MEMBERS } from '../../data/councilData';
import SpotlightCard from '../reactbits/SpotlightCard';

export default function CouncilSection({ onToast, onOpenEmergency }) {
  const [activeWing, setActiveWing] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const wings = ['All', 'Executive', 'Maintenance', 'Mess', 'Cultural', 'Technical', 'Sports', 'Web', 'Alumni'];

  const filteredMembers = COUNCIL_MEMBERS.filter((member) => {
    const matchesWing = activeWing === 'All' || member.wing === activeWing;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.ldap.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWing && matchesSearch;
  });

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    if (onToast) {
      onToast(`📋 ${label} copied to clipboard!`);
    }
  };

  return (
    <section id="council" className="section-wrapper dot-grid-bg">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Users size={13} />
            <span>Leadership & Administration</span>
          </div>
          <h2 className="section-title">Council & Warden Directory</h2>
          <p className="section-subtitle">
            Student representatives and institute administration working together for hostel operations, infrastructure upkeep, and resident welfare.
          </p>
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            alignItems: 'center',
            marginBottom: '2.5rem'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '0.95rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Search by name, role, wing, room or LDAP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem', borderRadius: 'var(--radius-sm)' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Wing Tabs */}
          <div className="tabs-header" style={{ marginBottom: 0 }}>
            {wings.map((wing) => (
              <button
                key={wing}
                onClick={() => setActiveWing(wing)}
                className={`tab-btn ${activeWing === wing ? 'active' : ''}`}
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
              >
                {wing}
              </button>
            ))}
          </div>
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Users size={36} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>No council members match query</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Try clearing the search box or changing the wing tab.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredMembers.map((member) => (
              <SpotlightCard
                key={member.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.5rem',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {/* Role Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-gold">
                    {member.wing} Wing
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    ldap: {member.ldap}
                  </span>
                </div>

                {/* Profile Header */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-card)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--h4-gold)', marginBottom: '0.1rem' }}>
                      {member.role}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {member.dept}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                  {member.bio}
                </p>

                {/* Details & Actions */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <MapPin size={14} color="var(--h4-gold)" />
                    <span>{member.room}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <a
                      href={`mailto:${member.email}`}
                      className="btn btn-sm btn-secondary"
                      style={{ flex: 1, padding: '0.4rem', fontSize: '0.78rem', textDecoration: 'none' }}
                      title="Send Email"
                    >
                      <Mail size={13} />
                      <span>Email</span>
                    </a>

                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      className="btn btn-sm btn-primary"
                      style={{ flex: 1, padding: '0.4rem', fontSize: '0.78rem', textDecoration: 'none' }}
                      title="Call Phone"
                    >
                      <Phone size={13} />
                      <span>Call</span>
                    </a>

                    <button
                      className="btn-icon btn-sm"
                      onClick={() => copyToClipboard(`${member.name} (${member.role}): ${member.phone} / ${member.email}`, member.name)}
                      title="Copy Contact Details"
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

        {/* Helpline Banner */}
        <div
          className="glass-card"
          style={{
            marginTop: '3rem',
            padding: '1.75rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--danger-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              <ShieldAlert size={24} color="var(--danger)" />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                Need Immediate Emergency or Security Assistance?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Access IITB Ambulance, Security Control Room, QRT, and Electrical Helplines.
              </p>
            </div>
          </div>

          <button className="btn btn-danger btn-sm" onClick={onOpenEmergency}>
            <Phone size={15} />
            <span>Open Emergency Helpline</span>
          </button>
        </div>
      </div>
    </section>
  );
}
