import React, { useState } from 'react';
import {
  Compass,
  Search,
  Building,
  Volume2
} from 'lucide-react';
import AmenitiesMap from './AmenitiesMap';
import WarCrySoundboard from './WarCrySoundboard';

export default function ResidentHub({ onToast }) {
  const [activeTab, setActiveTab] = useState('amenities');

  const hubTabs = [
    { id: 'amenities', label: 'Amenities & Floor Guide', icon: <Building size={18} /> },
    { id: 'warcry', label: 'War Cries & Soundboard', icon: <Volume2 size={18} /> }
  ];

  return (
    <section id="resident-hub" className="section-wrapper" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Compass size={14} />
            <span>Resident Community Hub</span>
          </div>
          <h2 className="section-title">Hostel Life & Everyday Utilities</h2>
          <p className="section-subtitle">
            Community noticeboard, floor-by-floor amenity guides, and the high-energy Madhouse chant soundboard.
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs-header">
          {hubTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'amenities' && <AmenitiesMap />}
          {activeTab === 'amenities' && <AmenitiesMap />}
          {activeTab === 'warcry' && <WarCrySoundboard onToast={onToast} />}
        </div>
      </div>
    </section>
  );
}
