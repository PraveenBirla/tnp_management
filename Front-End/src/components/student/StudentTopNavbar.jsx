import { Link, useLocation } from 'react-router-dom'
import { LogOut, Menu, X, Briefcase } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function StudentTopNavbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkVerificationStatus()
  }, [])

  const checkVerificationStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:8080/api/student/profile/verify',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )

      if (response.ok) {
        const data = await response.json()
        setIsVerified(data?.data?.verified === true)
      }
    } catch (err) {
      console.error('Error checking verification status:', err)
    } finally {
      setLoading(false)
    }
  }

  // Don't render navbar if not verified
  if (loading || !isVerified) {
    return null
  }

  const sections = [
    { path: '/student/profile', label: 'Profile' },
    { path: '/student/drives', label: 'Placements Drives' },
    { path: '/student/events', label: 'Events' },
    { path: '/student/learning', label: 'Learning Resources' },
    { path: '/student/alumni', label: 'Alumni' },
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
          <Link to="/student/drives" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center">
              <Briefcase size={26} className="text-amber-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">STUDENT</div>
              <div className="text-xs uppercase tracking-wide text-gray-500">
                Training & Placement Cell
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex justify-center gap-4">
            {sections.map(s => (
              <Link
                key={s.path}
                to={s.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === s.path
                    ? 'text-amber-600'
                    : 'text-gray-600 hover:text-amber-600'
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
