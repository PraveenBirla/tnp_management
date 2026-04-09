import { Link, useLocation, Outlet } from 'react-router-dom'
import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Footer from './Footer'

export default function PublicLayout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/statistics', label: 'Statistics' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between md:grid md:grid-cols-[auto,1fr,auto] md:gap-6">
          {/* Mobile: Full text left, Desktop: Compact logo */}
          <Link to="/" className="flex items-center gap-2 no-underline md:max-w-[180px]">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap size={20} className="text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">SATI Vidisha</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Training & Placement Cell
              </div>
            </div>
          </Link>

          {/* Desktop Links - Hidden on mobile */}
          <div className="hidden md:flex justify-center gap-4">
            {links.map(l => (
              <Link
                key={l.path}
                to={l.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === l.path
                    ? 'text-amber-600'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side: Hamburger on mobile (always visible), Login hidden on mobile */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/login"
              className="hidden md:inline-block bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90"
            >
              Login
            </Link>
            <button
              className="text-gray-900 p-1 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Unchanged */}
        {menuOpen && (
          <div className="flex flex-col px-4 py-3 bg-white border-t border-gray-200 md:hidden">
            {links.map(l => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-base text-gray-900 border-b border-gray-100 last:border-b-0 hover:text-amber-600"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-amber-600 font-bold text-base mt-2"
            >
              Login
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}