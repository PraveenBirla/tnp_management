import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-300">
        <p className="text-sm font-semibold text-gray-800">Year: {data.year}</p>
        <p className="text-sm text-gray-600">Total: {data.total}</p>
        <p className="text-sm text-gray-600">Placed: {data.placed}</p>
        <p className="text-sm font-semibold text-amber-600">
          Companies: {data.companies}
        </p>
      </div>
    );
  }
  return null;
};

export const PlacementChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/get-chart")
      .then(res => res.json())
      .then(result => {


        const apiData = result.data || [];

        // Current year
        const currentYear = new Date().getFullYear();

        // Last 7 years
        const last7Years = Array.from({ length: 7 }, (_, i) => currentYear - (6 - i));

        // 🔥 Fix: ensure year is number
        const dataMap = new Map(
          apiData.map(item => [Number(item.year), item])
        );

        // Fill missing years
        const completeData = last7Years.map(year =>
          dataMap.get(year) || { year, total: 0, placed: 0, companies: 0 }
        );



        setData(completeData);
      })
      .catch(err => console.error("Error fetching chart data:", err));
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Placement Trends
          </h2>
          <p className="text-gray-500">
            Year-wise placement performance (last 7 years)
          </p>
        </div>

        {/* Chart */}
        <div className="bg-white/60 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>

                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(0,0,0,0.08)' }}
                />

                {/* 🔥 Fixed bars */}
                <Bar dataKey="total" name="Total" fill="#9ca3af" minPointSize={5} />
                <Bar dataKey="placed" name="Placed" fill="#1f2937" minPointSize={5} />


              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>
    </section>
  );
};