import { Link } from 'react-router-dom'
import { GraduationCap, ArrowRight } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative grid min-h-[85vh] place-items-center px-4 sm:px-6 py-16 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] md:py-24 ">

      <div className="container mx-auto grid place-items-center text-center">

        <div className="grid max-w-4xl gap-y-6 md:gap-y-10">


          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl   leading-tight tracking-tight text-[#451a03] break-words">
            Welcome to <br />
            <span className="text-[#d97706]">
              Training & Placement Cell
            </span>
            <br />
            SATI Vidisha
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[#5d4037] opacity-90">
            Bridging the gap between academia and industry. Empowering students with
            the right skills and opportunities for a successful career.
          </p>

          {/* ✅ BUTTON FIX */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">

            <Link
              to="/login"
              className="w-full sm:w-auto text-center flex items-center justify-center gap-2 rounded-xl bg-[#451a03] px-6 sm:px-8 py-3 text-base sm:text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#2d1102]"
            >
              Login
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto text-center flex items-center justify-center gap-2 rounded-xl border-2 border-[#451a03] bg-white/30 px-6 sm:px-8 py-3 text-base sm:text-lg font-bold text-[#451a03] backdrop-blur-sm transition-all hover:bg-white/50"
            >
              Contact Us <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </div>
    </section>
  )
}