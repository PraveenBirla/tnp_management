import { Link } from 'react-router-dom'
import { Target } from 'lucide-react'

export const CTA = () => (
  <section className="cta-section">
    <div className="container cta-grid">
      <Target size={48} className="cta-icon" />
      <h2>Ready to Begin Your Career Journey?</h2>
      <div className="cta-buttons">
        <Link to="/register" className="btn-white">Register Now</Link>
        <Link to="/login" className="btn-outline-white">Login</Link>
      </div>
    </div>
  </section>
)