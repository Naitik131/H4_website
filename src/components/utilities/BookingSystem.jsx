import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, X, Check, Lock } from 'lucide-react';
import { EQUIPMENT_ITEMS } from '../../data/equipmentData';

// Defined hourly slots with timeline offset calculation
const DAY_HOURS = [
  { label: '08 AM', slot: '08:00 AM - 10:00 AM', start: 8, duration: 2 },
  { label: '10 AM', slot: '10:00 AM - 12:00 PM', start: 10, duration: 2 },
  { label: '12 PM', slot: '12:00 PM - 02:00 PM', start: 12, duration: 2 },
  { label: '02 PM', slot: '02:00 PM - 04:00 PM', start: 14, duration: 2 },
  { label: '04 PM', slot: '04:00 PM - 06:00 PM', start: 16, duration: 2 },
  { label: '06 PM', slot: '06:00 PM - 08:00 PM', start: 18, duration: 2 },
  { label: '08 PM', slot: '08:00 PM - 10:00 PM', start: 20, duration: 2 },
  { label: '10 PM', slot: '10:00 PM - 12:00 AM', start: 22, duration: 2 }
];

export default function BookingSystem({ onToast }) {
  const [selectedItemId, setSelectedItemId] = useState(EQUIPMENT_ITEMS[0].id);
  const [showBookingModal, setShowBookingModal] = useState(null); // { item, slot }
  
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('h4_timeline_bar_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'BK-1102',
        itemId: 'eq-06', // Music Room
        date: new Date().toISOString().split('T')[0],
        slot: '08:00 PM - 10:00 PM',
        room: 'Room 304',
        ldap: 'devika.iyer'
      },
      {
        id: 'BK-1103',
        itemId: 'eq-01', // TT Set
        date: new Date().toISOString().split('T')[0],
        slot: '04:00 PM - 06:00 PM',
        room: 'Room 114',
        ldap: 'karan.j'
      }
    ];
  });

  const [bookingForm, setBookingForm] = useState({
    date: new Date().toISOString().split('T')[0],
    room: '',
    ldap: '',
    purpose: ''
  });

  useEffect(() => {
    localStorage.setItem('h4_timeline_bar_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const activeItem = EQUIPMENT_ITEMS.find(item => item.id === selectedItemId) || EQUIPMENT_ITEMS[0];

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.room || !bookingForm.ldap) {
      if (onToast) onToast('Please enter your Room Number and LDAP username.');
      return;
    }

    const newBookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry = {
      id: newBookingId,
      itemId: showBookingModal.item.id,
      date: bookingForm.date,
      slot: showBookingModal.slot,
      room: bookingForm.room,
      ldap: bookingForm.ldap
    };

    setBookings([...bookings, newEntry]);
    setShowBookingModal(null);
    setBookingForm({ ...bookingForm, room: '', ldap: '', purpose: '' });
    if (onToast) {
      onToast(`Slot reserved successfully (ID: ${newBookingId})`);
    }
  };

  const handleCancelBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
    if (onToast) onToast('Booking cancelled.');
  };

  const getSlotStatus = (slot) => {
    const today = bookingForm.date;
    const match = bookings.find(b => b.itemId === activeItem.id && b.date === today && b.slot === slot);
    return match ? { booked: true, ldap: match.ldap, id: match.id, room: match.room } : { booked: false };
  };

  const totalBookedCount = DAY_HOURS.filter(h => getSlotStatus(h.slot).booked).length;
  const occupancyPercentage = Math.round((totalBookedCount / DAY_HOURS.length) * 100);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Visual Day Timeline Schedule
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          View daily occupied and available time blocks along the interactive schedule bar.
        </p>
      </div>

      {/* Select Box dropdown + Date Picker */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <label className="form-label">Select Facility or Equipment</label>
          <select
            className="form-select"
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            style={{ padding: '0.65rem 0.85rem', fontWeight: 600 }}
          >
            {EQUIPMENT_ITEMS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-input"
            value={bookingForm.date}
            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
          />
        </div>
      </div>

      {/* Selected Item Status Strip */}
      <div style={{
        background: 'var(--bg-subtle)',
        padding: '1.15rem 1.25rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-card)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <MapPin size={14} color="var(--h4-gold)" />
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{activeItem.location}</strong>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
            {activeItem.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Occupancy: </span>
            <span style={{ color: 'var(--h4-gold)', fontWeight: 700 }}>{occupancyPercentage}%</span>
          </div>
          <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
            Max {activeItem.maxHours}h / Booking
          </span>
        </div>
      </div>

      {/* ── VISUAL TIMELINE CALENDAR BAR ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.02rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Full-Day Schedule Bar ({bookingForm.date})
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--h4-gold)' }} />
              <span>Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--danger)' }} />
              <span>Occupied</span>
            </div>
          </div>
        </div>

        {/* Continuous Horizontal Bar Track */}
        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.75rem',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem' }}>
            {DAY_HOURS.map((h) => {
              const status = getSlotStatus(h.slot);
              return (
                <motion.div
                  key={h.slot}
                  whileHover={status.booked ? {} : { scale: 1.03 }}
                  whileTap={status.booked ? {} : { scale: 0.97 }}
                  onClick={() => {
                    if (!status.booked) {
                      setShowBookingModal({ item: activeItem, slot: h.slot });
                    }
                  }}
                  style={{
                    height: '64px',
                    borderRadius: 'var(--radius-xs)',
                    background: status.booked
                      ? 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(185,28,28,0.3) 100%)'
                      : 'linear-gradient(135deg, rgba(197,168,128,0.12) 0%, rgba(197,168,128,0.2) 100%)',
                    border: status.booked ? '1px solid var(--danger-bg)' : '1px solid var(--border-focus)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '0.5rem',
                    cursor: status.booked ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: status.booked ? 'var(--danger)' : 'var(--h4-gold)' }}>
                    <span>{h.label}</span>
                    {status.booked ? <Lock size={11} /> : <Check size={11} />}
                  </div>

                  <div style={{ fontSize: '0.68rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: status.booked ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: 600 }}>
                    {status.booked ? status.ldap : 'Open'}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hourly Slot List */}
      <div>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
          Detailed Slot Breakdown
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {DAY_HOURS.map((h) => {
            const status = getSlotStatus(h.slot);
            return (
              <div
                key={h.slot}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-card)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={14} color="var(--h4-gold)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {h.slot}
                  </span>
                </div>

                <div>
                  {status.booked ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                        Booked by {status.ldap} ({status.room})
                      </span>
                      {status.ldap === bookingForm.ldap && (
                        <button
                          onClick={() => handleCancelBooking(status.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '0.75rem', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowBookingModal({ item: activeItem, slot: h.slot })}
                      className="btn btn-sm btn-primary"
                      style={{ padding: '0.2rem 0.65rem', fontSize: '0.72rem' }}
                    >
                      Book Slot
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            key="bar-booking-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowBookingModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="modal-container"
              style={{ maxWidth: '480px', width: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-title">
                  <Calendar size={18} color="var(--h4-gold)" />
                  <span>Reserve Time Block</span>
                </div>
                <button className="btn-icon" onClick={() => setShowBookingModal(null)}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleBookSubmit}>
                <div className="modal-body">
                  <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-xs)', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)', border: '1px solid var(--border-card)' }}>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {showBookingModal.item.name}
                    </div>
                    <div>Date: {bookingForm.date}</div>
                    <div>Slot: {showBookingModal.slot}</div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Room Number *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 214 Wing B"
                        value={bookingForm.room}
                        onChange={(e) => setBookingForm({ ...bookingForm, room: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">LDAP Username *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. your_ldap"
                        value={bookingForm.ldap}
                        onChange={(e) => setBookingForm({ ...bookingForm, ldap: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Notes (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. GC Practice, Jamming session"
                      value={bookingForm.purpose}
                      onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowBookingModal(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
