import { companies } from "../../data/companies"

export const VisitedCompanies = () => (
  <section className="py-12 bg-gradient-to-b from-[#f5f5dc] to-[#FFFFF0] pb-10 overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">

      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Visited Companies
      </h2>

      {/* Slider */}
      <div className="relative overflow-hidden pb-10">

        <div className="flex gap-10  pt-8 animate-scroll will-change-transform whitespace-nowrap hover:[animation-play-state:paused]">

          {[...companies, ...companies].map((company, i) => (
            <div
              key={i}
              className="min-w-[150px] flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center p-4 rounded-xl bg-white/60 backdrop-blur-md shadow-md hover:scale-110 transition"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-14 h-14 object-contain mb-2  transition"
              />
              <p className="text-xs font-medium text-gray-700 text-center">
                {company.name}
              </p>
            </div>
          ))}

        </div>


      </div>
    </div>
  </section>
)