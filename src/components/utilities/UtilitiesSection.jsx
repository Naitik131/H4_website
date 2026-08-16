import React, { useState } from 'react';
import {
  Layers,
  Wrench,
  Wifi,
  Utensils,
  CalendarCheck,
  Calculator
} from 'lucide-react';
import ComplaintsPortal from './ComplaintsPortal';
import LanGuide from './LanGuide';
import MessMenu from './MessMenu';
import BookingSystem from './BookingSystem';
import MessRebateCalculator from './MessRebateCalculator';

export default function UtilitiesSection({ onToast }) {
  const [activeTab, setActiveTab] = useState('complaints');

  const utilityTabs = [
    { id: 'complaints', label: 'Complaints Portal', icon: <Wrench size={16} /> },
    { id: 'lan', label: 'LAN & Wi-Fi Setup', icon: <Wifi size={16} /> },
    { id: 'mess', label: 'Weekly Mess Menu', icon: <Utensils size={16} /> },
    { id: 'rebate', label: 'Mess Rebate Estimator', icon: <Calculator size={16} /> },
    { id: 'booking', label: 'Gear & Room Booking', icon: <CalendarCheck size={16} /> }
  ];

  return (
    <section id="utilities" className="section-wrapper">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Layers size={13} />
            <span>Resident Utilities Suite</span>
          </div>
          <h2 className="section-title">Hostel Services & Operations</h2>
          <p className="section-subtitle">
            Self-service digital utilities: log maintenance issues, configure campus LAN, view weekly menus, calculate mess rebates, and book equipment.
          </p>
        </div>

        {/* Master Navigation Tabs */}
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

        {/* Dynamic Utility Component */}
        <div>
          {activeTab === 'complaints' && <ComplaintsPortal onToast={onToast} />}
          {activeTab === 'lan' && <LanGuide onToast={onToast} />}
          {activeTab === 'mess' && <MessMenu onToast={onToast} />}
          {activeTab === 'rebate' && <MessRebateCalculator onToast={onToast} />}
          {activeTab === 'booking' && <BookingSystem onToast={onToast} />}
        </div>
      </div>
    </section>
  );
}
