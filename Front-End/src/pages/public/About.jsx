import { Target, Users, Award, BookOpen, Handshake, Lightbulb } from 'lucide-react'

const features = [
  { icon: Handshake, title: 'Industry Connect', desc: 'Building strong ties with leading companies across sectors for campus recruitment.' },
  { icon: BookOpen, title: 'Skill Development', desc: 'Regular workshops, mock interviews, and training programs to enhance employability.' },
  { icon: Lightbulb, title: 'Career Guidance', desc: 'Personal counseling and career planning support for every student.' },
  { icon: Users, title: 'Alumni Network', desc: 'Leveraging a strong alumni base for mentorship and referral opportunities.' },
  { icon: Award, title: 'Aptitude Training', desc: 'Dedicated aptitude and soft-skills training modules for placement preparation.' },
  { icon: Target, title: 'Internships', desc: 'Facilitating summer and semester-long internships with top organizations.' },
]

const team = [
  { name: 'Prof. Abhishek Mathur', role: 'Placement Officer', dept: 'Training & Placement Cell' },
  { name: 'Dr. Abhishek Jain', role: 'Assistant Training & Placement Officer', dept: 'Training & Placement Cell' },
  { name: 'Prof. Dolly Panthi', role: 'Assistant Training & Placement Officer', dept: 'Training & Placement Cell' },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-900), var(--navy))', padding: '4rem 0', color: 'white' }}>
        <div className="container slide-up">
          <h1 style={{ color: 'white', marginBottom: '1rem', fontSize: '2.5rem' }}>
            About the <span className="text-gold">Training & Placement Cell</span>
          </h1>
          <p style={{ color: 'var(--gray-400)', maxWidth: 700, fontSize: '1.05rem', lineHeight: 1.7 }}>
            The Training & Placement Cell at SATI Vidisha acts as a bridge between the institute
            and the corporate world. Established with the vision of providing quality placement
            assistance, the cell works year-round to prepare students for successful careers.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '4rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="card">
              <div className="card-body" style={{ padding: '2rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: 'var(--gold-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Target size={24} color="var(--gold-600)" />
                </div>
                <h3 style={{ marginBottom: '0.75rem' }}>Our Mission</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.7 }}>
                  To provide every student with the opportunity to explore and build a meaningful career
                  through comprehensive training, personality development, and exposure to leading industry recruiters.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body" style={{ padding: '2rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: 'rgba(10,31,68,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Lightbulb size={24} color="var(--navy)" />
                </div>
                <h3 style={{ marginBottom: '0.75rem' }}>Our Vision</h3>
                <p style={{ color: 'var(--gray-600)', lineHeight: 1.7 }}>
                  To be recognized as a center of excellence in campus recruitment, producing industry-ready
                  graduates who contribute meaningfully to the growth of organizations and society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '4rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>What We Do</h2>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>Comprehensive placement support for every student</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div key={i} className="card" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}>
                  <div className="card-body" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--gold-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={22} color="var(--gold-600)" />
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.375rem' }}>{f.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '4rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>Our Team</h2>
            <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>Dedicated faculty members driving placement success</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {team.map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div className="card-body" style={{ padding: '2rem' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 700 }}>
                    {m.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </div>
                  <h4>{m.name}</h4>
                  <p style={{ color: 'var(--gold-600)', fontSize: '0.875rem', fontWeight: 500, marginTop: '0.25rem' }}>{m.role}</p>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>{m.dept}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
