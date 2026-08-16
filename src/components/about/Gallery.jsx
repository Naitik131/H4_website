import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../../data/galleryData';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="section-wrapper" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Camera size={14} />
            <span>Memories & Moments</span>
          </div>
          <h2 className="section-title">Madhouse Photo & Event Gallery</h2>
          <p className="section-subtitle">
            Relive the high-octane GC celebrations, Valfi farewell roasts, sports triumphs, and unforgettable hostel nights.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="tabs-header">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="gallery-card glass-card"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-img"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <div className="gallery-tag">{item.category}</div>
                <h4 className="gallery-card-title">{item.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.8rem', opacity: 0.85 }}>
                  <span>{item.date}</span>
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div className="modal-overlay" onClick={closeLightbox} style={{ zIndex: 2500, padding: '1rem' }}>
          <div
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-card)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="btn-icon"
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none'
              }}
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows */}
            <button
              className="btn-icon"
              onClick={showPrev}
              style={{
                position: 'absolute',
                top: '45%',
                left: '1rem',
                zIndex: 10,
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none'
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="btn-icon"
              onClick={showNext}
              style={{
                position: 'absolute',
                top: '45%',
                right: '1rem',
                zIndex: 10,
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none'
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <div style={{ width: '100%', maxHeight: '550px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={currentItem.image}
                alt={currentItem.title}
                style={{ width: '100%', maxHeight: '550px', objectFit: 'contain' }}
              />
            </div>

            {/* Caption & Metadata */}
            <div style={{ padding: '1.5rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge badge-gold">{currentItem.category}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{currentItem.date}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.45rem' }}>
                {currentItem.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
