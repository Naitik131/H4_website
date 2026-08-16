import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EmergencyModal from './components/layout/EmergencyModal';
import NoticeTicker from './components/hero/NoticeTicker';
import AllNoticesModal from './components/hero/AllNoticesModal';
import CommandPalette from './components/reactbits/CommandPalette';
import OpeningSequence from './components/madhouse/OpeningSequence';
import Toast from './components/ui/Toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CouncilPage from './pages/CouncilPage';
import UtilitiesPage from './pages/UtilitiesPage';
import ResidentHubPage from './pages/ResidentHubPage';
import NoticeBoardPage from './pages/NoticeBoardPage';
import GalleryPage from './pages/GalleryPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes({ addToast, setIsEmergencyOpen }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <HomePage
              onOpenCommandPalette={() => {}}
              onOpenAllNotices={() => {}}
              onToast={addToast}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/notices" element={<NoticeBoardPage />} />
        <Route
          path="/council"
          element={
            <CouncilPage
              onToast={(msg) => addToast(msg, 'info')}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />
          }
        />
        <Route
          path="/utilities"
          element={<UtilitiesPage onToast={(msg) => addToast(msg, 'success')} />}
        />
        <Route
          path="/hub"
          element={<ResidentHubPage onToast={(msg) => addToast(msg, 'info')} />}
        />
      </Routes>
    </AnimatePresence>
  );
}

function MainAppContent() {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAllNoticesOpen, setIsAllNoticesOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCopy = (text, message) => {
    navigator.clipboard.writeText(text);
    addToast(message || 'Copied to clipboard!', 'success');
  };

  return (
    <div className="app-layout">
      <ScrollToTop />

      {/* Opening Intro Sequence */}
      <OpeningSequence />

      {/* Navigation Bar */}
      <Navbar
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Breaking Notices Marquee Ticker */}
      <NoticeTicker onOpenAllNotices={() => setIsAllNoticesOpen(true)} />

      {/* Animated Multi-Page Routes */}
      <main className="main-content">
        <AnimatedRoutes addToast={addToast} setIsEmergencyOpen={setIsEmergencyOpen} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Command Palette */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onCopy={handleCopy}
      />

      <AllNoticesModal
        isOpen={isAllNoticesOpen}
        onClose={() => setIsAllNoticesOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(path) => {
          window.location.hash = `#/${path === 'hero' ? '' : path}`;
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Toast System */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <Router>
          <MainAppContent />
        </Router>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
