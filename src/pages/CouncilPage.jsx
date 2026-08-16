import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Phone, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { COUNCIL_MEMBERS } from '../data/councilData';

const wingColors = {
  Executive: '#c5a880',
  Maintenance: '#60a5fa',
  Mess: '#34d399',
  Cultural: '#f472b6',
  Technical: '#a78bfa',
  Sports: '#fb923c',
  Web: '#38bdf8',
  Alumni: '#fbbf24',
};

export default function CouncilPage({ onToast, onOpenEmergency }) {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
          <span className="section-tag">Hostel Leadership</span>
          <h1 className="section-title">
            <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
              <motion.span
                initial={{ rotate: 0, y: 0 }}
                animate={{ rotate: [0, 20, -15, 12], y: [0, 6, 3, 5] }}
                transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 150, damping: 10 }}
                style={{ display: 'inline-block', transformOrigin: 'top left', color: 'var(--h4-gold)' }}
              >
                T
              </motion.span>
              <span>he Council</span>
            </span>
          </h1>
          <p className="section-subtitle">
            Representing the community, organizing festivals, and modernizing the legacy of Hostel 4.
          </p>
        </motion.div>

        {/* 3D Coverflow Swiper View Only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ padding: '1rem 0 3rem' }}
        >
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: false
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{ nextEl: '.swiper-btn-next', prevEl: '.swiper-btn-prev' }}
            style={{ paddingBottom: '3.5rem' }}
          >
            {COUNCIL_MEMBERS.map((member) => {
              const accent = wingColors[member.wing] || 'var(--h4-gold)';
              return (
                <SwiperSlide key={member.id} style={{ width: '310px' }}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    onClick={() => setSelectedMember(member)}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      userSelect: 'none',
                      position: 'relative',
                    }}
                  >
                    {/* Tall full portrait photo */}
                    <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0e1015&color=c5a880&size=400`; }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,12,0.98) 0%, transparent 60%)' }} />
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.22rem 0.65rem',
                        borderRadius: '99px',
                        background: `${accent}22`,
                        border: `1px solid ${accent}44`,
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: accent,
                        letterSpacing: '0.04em'
                      }}>
                        {member.wing}
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.75rem', color: accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                          {member.role}
                        </div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1.25 }}>
                          {member.name}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem', background: 'var(--bg-subtle)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        {member.dept}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <MapPin size={12} color={accent} />
                        <span>{member.room}</span>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Nav Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="swiper-btn-prev btn-icon" style={{ width: '44px', height: '44px' }}>
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="swiper-btn-next btn-icon" style={{ width: '44px', height: '44px' }}>
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-card"
          style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-xs)', background: 'var(--danger-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={20} color="var(--danger)" />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.1rem' }}>
                Emergency Contacts &amp; Medical Helplines
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>IITB Hospital, Security, and Electrical Helpline.</p>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="btn btn-danger btn-sm" onClick={onOpenEmergency}>
            <Phone size={13} />
            <span>Open Helplines</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key="member-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="modal-overlay"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'var(--bg-elevated)',
                borderRadius: '20px',
                overflow: 'hidden',
                maxWidth: '500px',
                width: '100%',
                border: '1px solid var(--border-card)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large portrait */}
              <div style={{ position: 'relative', height: '320px' }}>
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=0e1015&color=c5a880&size=500`; }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,12,1) 0%, transparent 50%)' }} />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="btn-icon"
                  onClick={() => setSelectedMember(null)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <X size={16} />
                </motion.button>
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                  <div style={{ fontSize: '0.78rem', color: wingColors[selectedMember.wing] || 'var(--h4-gold)', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {selectedMember.wing} • {selectedMember.role}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                    {selectedMember.name}
                  </div>
                </div>
              </div>
              {/* Details */}
              <div style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {selectedMember.bio}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <MapPin size={13} color="var(--h4-gold)" />
                    <span>{selectedMember.room}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--h4-gold)' }}>DEPT</span>
                    <span>{selectedMember.dept}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

