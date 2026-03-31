import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-900), var(--navy))', padding: '3.5rem 0', color: 'white' }}>
        <div className="container slide-up">
          <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Contact <span className="text-gold">Us</span></h1>
          <p style={{ color: 'var(--gray-400)', maxWidth: 600 }}>
            Have questions about placements? Reach out to the Training & Placement Cell.
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Contact Info */}
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Get in Touch</h3>
              {[
                { icon: Mail, label: 'Email', value: 'tnp@sati.ac.in' },
                { icon: Phone, label: 'Phone', value: '+91-7592-250963' },
                { icon: MapPin, label: 'Address', value: 'Samrat Ashok Technological Institute, Vidisha, Madhya Pradesh 464001' },
                { icon: Clock, label: 'Office Hours', value: 'Mon–Fri, 10:00 AM – 5:00 PM' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="card" style={{ marginBottom: '1rem' }}>
                    <div className="card-body" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--gold-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={20} color="var(--gold-600)" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                        <div style={{ fontWeight: 500, color: 'var(--gray-700)', marginTop: '0.25rem' }}>{item.value}</div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Map Placeholder */}
              <div className="card" style={{ marginTop: '1rem' }}>
                <div style={{ height: 200, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <MapPin size={32} />
                    <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Map integration available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <div className="card-header"><h3>Send a Message</h3></div>
              <div className="card-body">
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <Send size={24} color="#065F46" />
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--gray-500)' }}>We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input className="form-input" placeholder="What's this about?" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea className="form-input" placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      <Send size={18} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
