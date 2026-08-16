import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { GALLERY_ITEMS } from '../../data/galleryData';

export default function AutoScrollGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div style={{ position: 'relative', padding: '1.5rem 0', overflow: 'hidden' }}>
      {/* Top row — scrolls left */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        freeMode
        speed={6000}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
        allowTouchMove={false}
        style={{ marginBottom: '16px' }}
      >
        {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, idx) => (
          <SwiperSlide key={`top-${idx}`} style={{ width: 'auto' }}>
            <GalleryCard item={item} onClick={() => setSelectedPhoto(item)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom row — scrolls right (reversed) */}
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        loop
        freeMode
        speed={5000}
        autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true, pauseOnMouseEnter: true }}
        allowTouchMove={false}
      >
        {[...GALLERY_ITEMS, ...GALLERY_ITEMS].reverse().map((item, idx) => (
          <SwiperSlide key={`bot-${idx}`} style={{ width: 'auto' }}>
            <GalleryCard item={item} onClick={() => setSelectedPhoto(item)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="modal-overlay"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="modal-container"
              style={{ maxWidth: '800px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-gold">{selectedPhoto.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedPhoto.date}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="btn-icon"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X size={18} />
                </motion.button>
              </div>
              <div style={{ background: '#000', maxHeight: '460px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.img
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  style={{ width: '100%', maxHeight: '460px', objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '1.25rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                  {selectedPhoto.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryCard({ item, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        width: '280px',
        height: '190px',
        position: 'relative',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        border: '1px solid var(--border-card)',
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 30%, rgba(8,9,12,0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0.85rem',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: '0.65rem', color: 'var(--h4-gold)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
          {item.category}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
          {item.title}
        </div>
      </motion.div>
    </motion.div>
  );
}
