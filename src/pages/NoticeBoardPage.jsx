import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Calendar, User, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { NOTICES_DATA } from '../data/noticesData';

export default function NoticeBoardPage() {
  const [selectedNotice, setSelectedNotice] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="page-wrapper dot-grid-bg"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="section-tag">Official Records</span>
          <h1 className="section-title">
            <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
              <motion.span
                initial={{ y: -100, rotate: -28, opacity: 0 }}
                animate={{ y: 5, rotate: 12, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 190, damping: 13, mass: 1.1 }}
                style={{ display: 'inline-block', transformOrigin: 'top left', color: 'var(--h4-gold)' }}
              >
                H
              </motion.span>
              <span>ostel 4 Notice Board</span>
            </span>
          </h1>
          <p className="section-subtitle">
            Official administrative circulars, warden announcements, and hall council updates.
          </p>
        </motion.div>

        {/* Pinboard Canvas */}
        <div
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-card)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            position: 'relative',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '4rem'
          }}
        >
          {/* Header Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            borderBottom: '1px dashed var(--border-subtle)',
            paddingBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--h4-gold)' }}>
              <Bell size={15} />
              <span>IIT BOMBAY — HOSTEL 4 OFFICIAL BULLETIN BOARD</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {NOTICES_DATA.length} CIRCULARS ON DISPLAY
            </span>
          </div>

          {/* Grid of Pinned Notice Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {NOTICES_DATA.map((notice, idx) => {
              const rotation = idx % 2 === 0 ? '-0.7deg' : '0.7deg';
              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, rotate: 0, scale: 1.01 }}
                  onClick={() => setSelectedNotice(notice)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: '16px',
                    padding: '1.6rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transform: `rotate(${rotation})`,
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  {/* Brass Thumbtack Pin */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #e2e8f0, #475569)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
                    border: '1px solid #94a3b8',
                    zIndex: 10
                  }} />

                  <div>
                    {/* Notice Seal Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)' }}>
                        REF #{notice.id.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {notice.date}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {notice.title}
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {notice.summary}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{notice.author}</span>
                    <span style={{ color: 'var(--h4-gold)', fontWeight: 600, fontSize: '0.78rem' }}>
                      Read Full Notice →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FULL NOTICE DOCUMENT MODAL */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            key="notice-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setSelectedNotice(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maxWidth: '680px',
                width: '100%',
                background: 'var(--bg-elevated)',
                borderRadius: '20px',
                border: '1px solid var(--border-card)',
                boxShadow: '0 30px 90px rgba(0,0,0,0.8)',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Official Header */}
              <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--h4-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    INDIAN INSTITUTE OF TECHNOLOGY BOMBAY • HOSTEL 4
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    Official Hall Circular #{selectedNotice.id.toUpperCase()}
                  </h2>
                </div>
                <button className="btn-icon" onClick={() => setSelectedNotice(null)}>
                  <X size={18} />
                </button>
              </div>

              {/* Document Body */}
              <div style={{ padding: '2rem', maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>DATE: </span>
                    {selectedNotice.date}
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>ISSUED BY: </span>
                    {selectedNotice.author}
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>CATEGORY: </span>
                    {selectedNotice.category}
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>
                  {selectedNotice.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
                  {selectedNotice.fullText || selectedNotice.summary}
                </p>

                {/* Sign-Off Seal Box */}
                <div style={{
                  background: 'var(--bg-subtle)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-card)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShieldCheck size={24} color="var(--h4-gold)" />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Verified Official Communication
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Hall Warden Office &amp; Student Executive Council
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-gold">Official Seal</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
