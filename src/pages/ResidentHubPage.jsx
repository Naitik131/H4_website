import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Building
} from 'lucide-react';
import AmenitiesMap from '../components/resident-hub/AmenitiesMap';

export default function ResidentHubPage({ onToast }) {
  const [activeTab, setActiveTab] = useState('amenities');

  const hubTabs = [
    { id: 'amenities', label: 'Amenities & Facilities', icon: <Building size={15} /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="page-wrapper dot-grid-bg"
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Community</span>
          <h1 className="section-title">
            <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
              <motion.span
                initial={{ y: -100, rotate: -28, opacity: 0 }}
                animate={{ y: 5, rotate: 12, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 190, damping: 13, mass: 1.1 }}
                style={{ display: 'inline-block', transformOrigin: 'top left', color: 'var(--h4-gold)' }}
              >
                R
              </motion.span>
              <span>esident Community Hub</span>
            </span>
          </h1>
          <p className="section-subtitle">
            Community lost and found board and hostel amenities navigator.
          </p>
        </div>

        {/* Tab Header */}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'amenities' && <AmenitiesMap />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
