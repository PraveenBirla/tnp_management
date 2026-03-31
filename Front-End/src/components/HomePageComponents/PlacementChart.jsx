import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export const PlacementChart = ({ data }) => (
  <section className="py-16 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc]">

    <div className="max-w-6xl mx-auto px-4">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Placement Trends
        </h2>
        <p className="text-gray-500">
          Year-wise placement performance over the last 6 years
        </p>
      </div>

      {/* Chart Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">

        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>

              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#374151', fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#374151', fontSize: 12 }}
              />

              <Tooltip
                cursor={{ fill: '#fef3c7' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
                }}
              />

              <Bar
                dataKey="placed"
                name="Placed"
                fill="#1f2937"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="companies"
                name="Companies"
                fill="#f59e0b"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>

  </section>
)