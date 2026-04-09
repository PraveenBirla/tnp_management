export const StatsGrid = ({ stats }) => (
  <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="flex items-center gap-4 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md bg-white/60 backdrop-blur-md hover:shadow-lg transition-all"
            >
              {/* Same icon sizing, just scaled down slightly for mobile */}
              <div
                className="flex items-center justify-center w-8 h-10 sm:w-20 sm:h-24 md:w-24 md:h-32 rounded-xl flex-shrink-0"
                style={{
                  backgroundColor: `${stat.color}15`,
                  color: stat.color,
                }}
              >
                <Icon size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>


              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-xl md:text-xl font-semibold text-gray-800 leading-tight line-clamp-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)