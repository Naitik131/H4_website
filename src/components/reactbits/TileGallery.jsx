import React from 'react';
import './TileGallery.css';

export default function TileGallery({ images = [] }) {
  const openOverlay = (src) => {
    const overlay = document.createElement('div');
    overlay.className = 'tg-overlay';
    const img = document.createElement('img');
    img.className = 'tg-overlay-img';
    img.src = src;
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    // trigger fade-in
    requestAnimationFrame(() => overlay.classList.add('visible'));
    const remove = () => {
      overlay.classList.remove('visible');
      overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    };
    overlay.addEventListener('click', remove, { once: true });
  };

  return (
    <div className="tg-grid">
      {images.map((src, idx) => (
        <div className="tg-item" key={idx}>
          <img src={src} alt={`gallery-${idx}`} onClick={(e) => openOverlay(src)} />
        </div>
      ))}
    </div>
  );
}
