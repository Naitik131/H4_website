import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Users,
  CheckCircle,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AMENITIES_DATA } from '../../data/amenitiesData';

export default function AmenitiesMap() {
  const [selectedAmenity, setSelectedAmenity] = useState(AMENITIES_DATA[0]);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            Hostel 4 Amenities & Facility Guide
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Explore state-of-the-art facilities across the reconstructed modern Madhouse building.
          </p>
        </div>

        <span className="badge badge-gold" style={{ fontSize: '0.8rem' }}>
          8 Core Resident Facilities
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Amenity List Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {AMENITIES_DATA.map((amenity) => {
            const isSelected = selectedAmenity.id === amenity.id;
            return (
              <button
                key={amenity.id}
                onClick={() => setSelectedAmenity(amenity)}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--h4-gold)' : 'var(--bg-subtle)',
                  color: isSelected ? '#000' : 'var(--text-primary)',
                  border: isSelected ? '1px solid var(--h4-gold)' : '1px solid var(--border-card)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.15rem' }}>
                    {amenity.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: isSelected ? 'rgba(0,0,0,0.7)' : 'var(--text-muted)' }}>
                    {amenity.floor}
                  </div>
                </div>

                <span
                  className="badge"
                  style={{
                    background: isSelected ? 'rgba(0,0,0,0.15)' : 'var(--bg-card)',
                    color: isSelected ? '#000' : 'var(--h4-gold)',
                    fontSize: '0.72rem'
                  }}
                >
                  {amenity.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Viewer */}
        {selectedAmenity && (
          <div
            className="glass-card"
            style={{
              padding: '1.75rem',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image */}
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                maxHeight: '220px',
                marginBottom: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={selectedAmenity.image}
                alt={selectedAmenity.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
            </div>

            {/* Title & Floor */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedAmenity.name}
              </h4>
              <span className="badge badge-gold">{selectedAmenity.category}</span>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={14} color="var(--h4-gold)" />
                {selectedAmenity.floor}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Users size={14} color="var(--h4-gold)" />
                {selectedAmenity.capacity}
              </span>
            </div>

            {/* Timings */}
            <div style={{ background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <Clock size={16} color="var(--h4-gold)" style={{ flexShrink: 0 }} />
              <span><strong>Timings:</strong> {selectedAmenity.timings}</span>
            </div>

            {/* Key Features */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Key Highlights & Gear:
              </div>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {selectedAmenity.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>

            {/* Rules */}
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong>📋 Guidelines:</strong> {selectedAmenity.rules}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
