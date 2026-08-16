import React, { useState } from 'react';
import DomeGallery from '../components/reactbits/DomeGallery';
import TileGallery from '../components/reactbits/TileGallery';
import { GALLERY_ITEMS } from '../data/galleryData';

export default function GalleryPage() {
  const [view, setView] = useState('dome'); // 'dome' or 'tiles'

  // derive image URLs from the canonical gallery data so one source updates all galleries
  const IMAGES = GALLERY_ITEMS.map((it) => it.image).filter(Boolean);

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        <h1 className="section-title">Gallery</h1>
        <p className="section-subtitle">Browse photos from IIT Bombay and Hostel 4.</p>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className={`btn ${view === 'dome' ? 'active' : ''}`} onClick={() => setView('dome')}>Dome View</button>
          <button className={`btn ${view === 'tiles' ? 'active' : ''}`} onClick={() => setView('tiles')}>Tile Gallery</button>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <div style={{ marginTop: '1rem' }}>
            {view === 'dome' ? (
              <div style={{
                width: '100vw',
                maxWidth: '100vw',
                marginLeft: 'calc(50% - 50vw)',
                height: '820px',
                overflow: 'hidden'
              }}>
                <DomeGallery fit={1} minRadius={950} grayscale={false} images={IMAGES} />
              </div>
            ) : (
              <div style={{ marginTop: '1rem' }}>
                <TileGallery images={IMAGES} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
