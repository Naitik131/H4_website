import React, { useState } from 'react';
import {
  Bell,
  X,
  Search,
  Pin,
  Calendar,
  User,
  Filter,
  Tag
} from 'lucide-react';
import { NOTICES_DATA } from '../../data/noticesData';

export default function AllNoticesModal({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  if (!isOpen) return null;

  const categories = ['All', 'Mess', 'Cult', 'Tech', 'Sports', 'Admin', 'Maintenance'];

  const filteredNotices = NOTICES_DATA.filter((notice) => {
    const matchesCategory = activeCategory === 'All' || notice.category === activeCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Bell size={24} color="var(--h4-gold)" />
            <span>Hostel 4 Official Notice Board</span>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Search & Category Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-input"
                placeholder="Search circulars, events, mess updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>

            <div className="tabs-header" style={{ margin: 0, justifyContent: 'flex-start' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Notices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredNotices.map((notice) => {
              const isExpanded = expandedId === notice.id;
              return (
                <div
                  key={notice.id}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {notice.isPinned && <Pin size={15} color="var(--h4-gold)" />}
                      <span className="badge badge-gold">{notice.category}</span>
                      {notice.urgency === 'high' && <span className="badge badge-danger">Urgent</span>}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{notice.date}</span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    {notice.title}
                  </h4>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {isExpanded ? notice.fullText : notice.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <span>Issued by: {notice.author}</span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : notice.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--h4-gold)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.82rem'
                      }}
                    >
                      {isExpanded ? 'Show Less' : 'Read Full Circular →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
