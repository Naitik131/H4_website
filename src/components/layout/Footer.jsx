import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ExternalLink,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import H4Logo from '../common/H4Logo';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', padding: '3.5rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <H4Logo size={32} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>
                Hostel 4 <span style={{ color: 'var(--h4-gold)' }}>• Madhouse</span>
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Indian Institute of Technology Bombay, Powai, Mumbai - 400076. Home to over six decades of cultural, tech, and sports excellence.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a href="https://www.instagram.com/madhouseiitb/?hl=en" target="_blank" rel="noreferrer" className="btn-icon btn-sm" title="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.youtube.com/@madhousehostel4iitbombay282" target="_blank" rel="noreferrer" className="btn-icon btn-sm" title="YouTube">
                <YoutubeIcon />
              </a>
             
              <a href="https://www.facebook.com/InstiKaBaap/" target="_blank" rel="noreferrer" className="btn-icon btn-sm" title="Facebook">
                <FacebookIcon />
              </a>
              
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Portal Pages
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Home Overview</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Ethos, Culture & Gallery</Link>
              </li>
              <li>
                <Link to="/gallery" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Gallery</Link>
              </li>
              <li>
                <Link to="/council" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Council & Warden Directory</Link>
              </li>
              <li>
                <Link to="/utilities" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Maintenance & LAN Desk</Link>
              </li>
              <li>
                <Link to="/utilities" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Dining Menu & Rebate</Link>
              </li>
              <li>
                <Link to="/hub" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Resident Hub / Amenities</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institute Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              IIT Bombay Portals
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <li>
                <a href="https://gymkhana.iitb.ac.in" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>IITB Gymkhana</span> <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://asc.iitb.ac.in" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>ASC Academic SSO</span> <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://webmail.iitb.ac.in" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>IITB Webmail (LDAP)</span> <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://campreg.iitb.ac.in" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>Campreg Network</span> <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.iitb.ac.in" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>IITB Main Website</span> <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Office */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Hostel 4 Office
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <MapPin size={15} color="var(--h4-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Hostel 4, IIT Bombay Powai Campus</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Phone size={15} color="var(--h4-gold)" style={{ flexShrink: 0 }} />
                <span>022-2576-2704 (Hall Office)</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Mail size={15} color="var(--h4-gold)" style={{ flexShrink: 0 }} />
                <span>gsec.h4@iitb.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Hostel 4, IIT Bombay. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Made with <Heart size={13} color="var(--danger)" fill="var(--danger)" /> by Naitik Agarwal with Hostel 4 Council
          </div>
        </div>
      </div>
    </footer>
  );
}
