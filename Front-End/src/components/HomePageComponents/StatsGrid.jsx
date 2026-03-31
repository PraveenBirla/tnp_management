export const StatsGrid = ({ stats }) => (
  <section className="min-h-1/2 pt-10  py-10 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] flex items-center">

    <div className="max-w-6xl mx-auto px-4 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">

      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div
            key={i}
            className="flex items-center mt-12 mb-12 gap-6 p-5 rounded-2xl shadow-md bg-white/60 backdrop-blur-md hover:shadow-lg transition"
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center w-24 h-32 rounded-xl"
              style={{
                backgroundColor: `${stat.color}15`,
                color: stat.color,
              }}
            >
              <Icon size={26} />
            </div>

            {/* Text */}
            <div>
              <div className="text-xl font-semibold text-gray-800">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">
                {stat.label}
              </div>
            </div>
          </div>
        )
      })}

    </div>
  </section>
)