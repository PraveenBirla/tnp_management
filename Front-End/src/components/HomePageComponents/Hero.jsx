import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="h-[80svh] md:h-dvh min-h-[90svh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc]">
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl leading-tight tracking-tight text-[#451a03] break-words mb-4 sm:mb-6 md:mb-10">
          Welcome to <br className="hidden sm:block" />
          <span className="text-[#d97706]">Training & Placement Cell</span>
          <br />
          SATI Vidisha
        </h1>

        <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[#5d4037] opacity-90 mb-6 sm:mb-8 md:mb-10">
          Bridging the gap between academia and industry. Empowering students with
          the right skills and opportunities for a successful career.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
          <Link
            to="/login"
            className=" w-full sm:w-auto  flex items-center justify-center gap-2 rounded-xl bg-[#451a03] px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 text-xs sm:text-sm md:text-lg font-bold text-white shadow-lg min-h-[44px] transition-all hover:scale-105 hover:bg-[#2d1102] mx-auto sm:mx-0"
          >
            Login
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border-2 border-[#451a03] bg-white/30 px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3 text-xs sm:text-sm md:text-lg font-bold text-[#451a03] backdrop-blur-sm min-h-[44px] transition-all hover:bg-white/50 mx-auto sm:mx-0"
          >
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}