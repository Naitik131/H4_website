import React, { useState } from 'react';
import { Bell, ChevronRight, X, Pin, Calendar, User, Tag, Download } from 'lucide-react';
import { NOTICES_DATA } from '../../data/noticesData';

export default function NoticeTicker({ onOpenAllNotices }) {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'high':
        return <span className="badge badge-danger">Urgent</span>;
      case 'medium':
        return <span className="badge badge-gold">Important</span>;
      default:
        return <span className="badge badge-blue">Notice</span>;
    }
  };

  return (
    <>
      <div className="ticker-bar">
        <div className="container">
          <div className="ticker-content">
            <div className="ticker-badge">
              <Bell size={14} className="animate-pulse" />
              <span>Announcements</span>
            </div>

            <div style={{ overflow: 'hidden', width: '100%' }}>
              <div className="ticker-marquee">
                {NOTICES_DATA.concat(NOTICES_DATA).map((notice, idx) => (
                  <span
                    key={`${notice.id}-${idx}`}
                    className="ticker-item"
                    onClick={() => setSelectedNotice(notice)}
                  >
                    {notice.isPinned && <Pin size={13} color="var(--h4-gold)" />}
                    <strong>[{notice.category}]</strong> {notice.title}
                    <span style={{ opacity: 0.6 }}>• {notice.date}</span>
                    <span style={{ margin: '0 0.8rem', opacity: 0.4 }}>✦</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenAllNotices}
              className="btn btn-sm btn-secondary"
              style={{
                flexShrink: 0,
                padding: '0.25rem 0.65rem',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Single Notice Detail Modal */}
      {selectedNotice && (
        <div className="modal-overlay" onClick={() => setSelectedNotice(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="badge badge-gold">{selectedNotice.category}</span>
                {getUrgencyBadge(selectedNotice.urgency)}
              </div>
              <button className="btn-icon" onClick={() => setSelectedNotice(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                {selectedNotice.title}
              </h3>

              <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={14} /> {selectedNotice.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={14} /> {selectedNotice.author}
                </span>
              </div>

              <div
                style={{
                  background: 'var(--bg-subtle)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-line'
                }}
              >
                {selectedNotice.fullText || selectedNotice.summary}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedNotice(null)}>
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
