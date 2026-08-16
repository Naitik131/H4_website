import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, FileSpreadsheet, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

export default function ComplaintsPortal({ onToast }) {
  // Official Hostel 4 Google Form URL for automatic Google Sheets recording
  const GOOGLE_FORM_URL = 'https://forms.gle/H4MaintenancePortal';
  const RESPONSES_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/1FAIpQLSc-H4-IITB-Maintenance-Desk/pubhtml';

  const handleRedirect = (url, type) => {
    if (onToast) {
      onToast(`Opening ${type} in a new tab...`);
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
      {/* Editorial Card 1: File a Complaint */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card"
        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-subtle)' }}
      >
        <div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--h4-gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
            <Wrench size={22} color="var(--h4-gold)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            File Maintenance Request
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Encountered electrical malfunctions, plumbing issues, carpentry damage, or pest problems? Submit a request to the Hostel 4 estate team.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={14} color="var(--success)" />
              <span>Direct entry into the estate worksheet</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Clock size={14} color="var(--h4-gold)" />
              <span>Typical resolution within 24-48 hours</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleRedirect(GOOGLE_FORM_URL, 'Google Form')}
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>Open Maintenance Form</span>
          <ExternalLink size={14} />
        </motion.button>
      </motion.div>

      {/* Editorial Card 2: Track Sheet */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass-card"
        style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-subtle)' }}
      >
        <div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--h4-gold-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
            <FileSpreadsheet size={22} color="var(--h4-gold)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Live Tracking Registry
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Want to see if your issue has been assigned to a technician? Review the live, read-only response registry to check update statuses and resolution notes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={14} color="var(--success)" />
              <span>Publicly transparent queue</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Clock size={14} color="var(--h4-gold)" />
              <span>Updated in real-time by the GSec</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleRedirect(RESPONSES_SHEET_URL, 'Live Registry Sheet')}
          className="btn btn-secondary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <span>View Public Status Sheet</span>
          <ExternalLink size={14} />
        </motion.button>
      </motion.div>
    </div>
  );
}
