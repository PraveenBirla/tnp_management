import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy-900)',
      color: 'var(--gray-400)',
      padding: '3rem 0 1.5rem',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <GraduationCap size={24} color="#F5A623" />
              <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: '1rem' }}>SATI Vidisha</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Training & Placement Cell, Samrat Ashok Technological Institute, Vidisha (M.P.)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Link to="/about" style={{ color: 'var(--gray-400)' }}>About T&P Cell</Link>
              <Link to="/statistics" style={{ color: 'var(--gray-400)' }}>Placement Statistics</Link>
              <Link to="/contact" style={{ color: 'var(--gray-400)' }}>Contact Us</Link>
              <Link to="/register" style={{ color: 'var(--gray-400)' }}>Student Registration</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} /> tnp@sati.ac.in
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} /> +91-7592-250963
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} /> Vidisha, M.P. 464001
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--gray-500)',
        }}>
          © 2026 Samrat Ashok Technological Institute, Vidisha. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
