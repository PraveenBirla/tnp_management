import { Link, useLocation } from 'react-router-dom'
import { LogOut, Menu, X, Briefcase } from 'lucide-react'
import { useState } from 'react'

export default function TopNavbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const sections = [
    { path: '/admin/drives', label: 'Drives' },
    { path: '/admin/events', label: 'Events' },
    { path: '/admin/students', label: 'Students' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center">
              <Briefcase size={26} className="text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">ADMIN</div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Training & Placement Cell
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex justify-center gap-6">
            {sections.map(s => (
              <Link
                key={s.path}
                to={s.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === s.path
                    ? 'text-amber-600'
                    : 'text-gray-600  hover:text-amber-600 '
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-3">
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          {sections.map(s => (
            <Link
              key={s.path}
              to={s.path}
              onClick={() => setMenuOpen(false)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === s.path
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {s.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
