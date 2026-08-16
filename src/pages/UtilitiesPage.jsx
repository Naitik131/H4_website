import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Wifi,
  Utensils,
  CalendarCheck,
  Calculator
} from 'lucide-react';
import ComplaintsPortal from '../components/utilities/ComplaintsPortal';
import LanGuide from '../components/utilities/LanGuide';
import MessMenu from '../components/utilities/MessMenu';
import BookingSystem from '../components/utilities/BookingSystem';
import MessRebateCalculator from '../components/utilities/MessRebateCalculator';

export default function UtilitiesPage({ onToast }) {
  const [activeTab, setActiveTab] = useState('complaints');

  const utilityTabs = [
    { id: 'complaints', label: 'Complaints Portal', icon: <Wrench size={15} /> },
    { id: 'lan', label: 'LAN & Network Setup', icon: <Wifi size={15} /> },
    { id: 'mess', label: 'Mess Menu', icon: <Utensils size={15} /> },
    { id: 'booking', label: 'Gear & Room Booking', icon: <CalendarCheck size={15} /> }
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
          <span className="section-tag">Self-Service</span>
          <h1 className="section-title">
            <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
              <motion.span
                initial={{ y: -100, rotate: -30, opacity: 0 }}
                animate={{ y: 5, rotate: 13, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 190, damping: 13, mass: 1.1 }}
                style={{ display: 'inline-block', transformOrigin: 'top left', color: 'var(--h4-gold)' }}
              >
                S
              </motion.span>
              <span>tudent Utilities Suite</span>
            </span>
          </h1>
          <p className="section-subtitle">
            Log maintenance complaints, configure campus network settings, check weekly dining menus, and reserve sports gear.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="tabs-header">
          {utilityTabs.map((tab) => (
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

        {/* Dynamic Tab Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'complaints' && <ComplaintsPortal onToast={onToast} />}
            {activeTab === 'lan' && <LanGuide onToast={onToast} />}
            {activeTab === 'mess' && <MessMenu onToast={onToast} />}
            {activeTab === 'rebate' && <MessRebateCalculator onToast={onToast} />}
            {activeTab === 'booking' && <BookingSystem onToast={onToast} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
