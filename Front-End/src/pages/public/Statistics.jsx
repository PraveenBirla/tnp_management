import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { yearlyPlacementData, branchWiseData, packageDistribution } from '../../data/mockStats'

const COLORS = ['#0A1F44', '#F5A623', '#10B981', '#3B82F6', '#EF4444']

export default function Statistics() {
  return (
    <div>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-900), var(--navy))', padding: '3.5rem 0', color: 'white' }}>
        <div className="container slide-up">
          <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>
            Placement <span className="text-gold">Statistics</span>
          </h1>
          <p style={{ color: 'var(--gray-400)', maxWidth: 600 }}>
            Comprehensive placement data and analysis for SATI Vidisha across all branches and years.
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          {/* Quick Stats */}
          <div className="stats-grid" style={{ marginBottom: '3rem' }}>
            {[
              { label: 'Highest Package', value: '₹45 LPA', sub: '2025-26 Season' },
              { label: 'Average Package', value: '₹8.2 LPA', sub: '2025-26 Season' },
              { label: 'Total Companies', value: '55+', sub: 'This Year' },
              { label: 'Placement Rate', value: '85%', sub: 'Overall' },
            ].map((s, i) => (
              <div key={i} className="stat-card" style={{ '--accent-color': i % 2 === 0 ? 'var(--navy)' : 'var(--gold)' }}>
                <div className="stat-card-info">
                  <h4>{s.label}</h4>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-change text-muted">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Year-wise Trend */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <div className="card-header"><h3>Year-wise Placement Trend</h3></div>
            <div className="card-body" style={{ height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyPlacementData}>
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED' }} />
                  <Legend />
                  <Line type="monotone" dataKey="placed" name="Placed" stroke="#0A1F44" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="eligible" name="Eligible" stroke="#F5A623" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="companies" name="Companies" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            {/* Branch-wise */}
            <div className="card">
              <div className="card-header"><h3>Branch-wise Placement</h3></div>
              <div className="card-body" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchWiseData} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <YAxis dataKey="branch" type="category" tick={{ fontSize: 12, fill: '#6B7280' }} width={40} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E2E6ED' }} />
                    <Bar dataKey="percentage" name="Placement %" fill="#0A1F44" radius={[0, 4, 4, 0]}>
                      {branchWiseData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Package Distribution */}
            <div className="card">
              <div className="card-header"><h3>Package Distribution</h3></div>
              <div className="card-body" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={packageDistribution} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={100} label={({ range, percent }) => `${range} (${(percent * 100).toFixed(0)}%)`}>
                      {packageDistribution.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Package Highlights Table */}
          <div className="data-table-wrapper">
            <div className="card-header"><h3>Year-wise Package Details (in LPA)</h3></div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Academic Year</th>
                  <th>Students Placed</th>
                  <th>Eligible Students</th>
                  <th>Companies Visited</th>
                  <th>Highest Package</th>
                  <th>Average Package</th>
                </tr>
              </thead>
              <tbody>
                {yearlyPlacementData.map((y, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{y.year}</td>
                    <td>{y.placed}</td>
                    <td>{y.eligible}</td>
                    <td>{y.companies}</td>
                    <td>₹{y.highestPackage} LPA</td>
                    <td>₹{y.averagePackage} LPA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
