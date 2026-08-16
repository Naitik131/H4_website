import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, ShieldAlert, Menu, X, ChevronRight, Search } from 'lucide-react';
import H4Logo from '../common/H4Logo';

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 28 } },
  exit:   { x: '100%', opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } }
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.3 } })
};

export default function Navbar({ onOpenEmergency, onOpenCommandPalette }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Ethos & Lore', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Notice Board', path: '/notices' },
    { label: 'Council', path: '/council' },
    { label: 'Utilities', path: '/utilities' },
    { label: 'Resident Hub', path: '/hub' }
  ];

  // Navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className="navbar"
        animate={{
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4)'
            : '0 1px 0 rgba(255,255,255,0.04)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container">
          <div className="navbar-inner">
            {/* Brand */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link to="/" className="brand-logo">
                <H4Logo
                  id="nav-brand-icon"
                  size={34}
                />
                <div>
                  <div className="brand-title"><span>HOSTEL 4</span></div>
                  <div className="brand-subtitle">IIT Bombay</div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="nav-links">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  style={{ position: 'relative' }}
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                            style={{
                              position: 'absolute',
                              bottom: '-2px',
                              left: 0,
                              right: 0,
                              height: '2px',
                              background: 'var(--h4-gold)',
                              borderRadius: '2px',
                              transformOrigin: 'left',
                            }}
                          />
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="nav-actions">
              <motion.button
                className="cmd-k-pill hide-mobile"
                onClick={onOpenCommandPalette}
                whileHover={{ scale: 1.04, borderColor: 'var(--border-focus)' }}
                whileTap={{ scale: 0.96 }}
                title="Search (Cmd+K)"
              >
                <Search size={13} />
                <span>Search</span>
                <kbd style={{ fontSize: '0.68rem', padding: '0.1rem 0.3rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-card)', borderRadius: '3px' }}>⌘K</kbd>
              </motion.button>

              <motion.button
                className="btn btn-sm btn-danger"
                onClick={onOpenEmergency}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                style={{ padding: '0.35rem 0.75rem' }}
              >
                <ShieldAlert size={14} />
                <span className="hide-mobile">SOS</span>
              </motion.button>

              <motion.button
                className="btn-icon"
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex' }}
                  >
                    {theme === 'dark'
                      ? <Sun size={16} color="var(--h4-gold)" />
                      : <Moon size={16} color="var(--iitb-blue)" />
                    }
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <motion.button
                className="btn-icon mobile-only"
                onClick={() => setMobileMenuOpen(true)}
                style={{ display: 'none' }}
                id="menu-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open menu"
              >
                <Menu size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 1500,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
              }}
            />
            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="drawer-panel"
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '280px', zIndex: 1600, padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="brand-icon-box" style={{ width: '28px', height: '28px' }}><Flame size={16} /></div>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', fontFamily: 'var(--font-display)' }}>Hostel 4</span>
                </div>
                <motion.button
                  className="btn-icon"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={16} />
                </motion.button>
              </div>

              <motion.button
                className="cmd-k-pill"
                onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{ width: '100%', justifyContent: 'space-between', padding: '0.5rem 0.75rem', marginBottom: '1.25rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Search size={14} />
                  <span>Search Portal...</span>
                </div>
                <kbd style={{ fontSize: '0.7rem' }}>⌘K</kbd>
              </motion.button>

              <ul className="drawer-links" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {navItems.map((item, i) => (
                  <motion.li key={item.path} variants={linkVariants} initial="hidden" animate="visible" custom={i}>
                    <NavLink to={item.path} className="drawer-link" onClick={() => setMobileMenuOpen(false)}>
                      <span>{item.label}</span>
                      <ChevronRight size={15} color="var(--text-muted)" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <motion.button
                  className="btn btn-danger"
                  onClick={() => { setMobileMenuOpen(false); onOpenEmergency(); }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%' }}
                >
                  <ShieldAlert size={15} />
                  <span>Emergency Helplines</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          #menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
