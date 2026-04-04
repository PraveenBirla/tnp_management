import { useState, useEffect } from 'react'
import { Loader } from 'lucide-react'
import {fetchWithAuth} from '../../api/fetchWithAuth'

export default function StudentDrivesPage() {
  const [drives, setDrives] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [registering, setRegistering] = useState({})

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchDrives()
  }, [])

  const fetchDrives = async () => {
    try {
      setLoading(true)
      const response = await fetchWithAuth('/drive/get_all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setDrives(data.data || [])
      setError(null)
    } catch (err) {
      setError('Failed to load drives')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (driveId) => {
    setRegistering(prev => ({ ...prev, [driveId]: true }))

    try {
      const response = await fetchWithAuth(`/student/drive/apply/${driveId}`, {
        method: 'POST',
      })

      if (response.ok) {
        alert('Successfully registered for the drive!')
        fetchDrives()
      } else {
        const data = await response.json()
        alert(data.Error.message || 'Failed to register')
      }
    } catch (err) {
      alert('Error registering for drive')
      console.error(err)
    } finally {
      setRegistering(prev => ({ ...prev, [driveId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-700 text-lg">Loading drives...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Placement Drives</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Drives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive) => (
            <div
              key={drive.id}
              className="bg-[#fffdf7] rounded-2xl border border-[#f1e6d3] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
                {/* Header */}
                <div className="p-4 border-b border-[#f1e6d3]">
                  <h3 className="text-lg font-semibold text-[#d97706]">
                    {drive.companyName}
                  </h3>
                  <p className="text-sm text-[#7c5e3c]">{drive.jobRole}</p>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Package */}
                  <div>
                    <p className="text-sm text-[#7c5e3c]">Package</p>
                    <p className="text-2xl font-bold text-[#d97706]">
                      ₹{drive.packageLPA} LPA
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-[#fff7ed] p-3 rounded-lg border border-[#f3e2c7]">
                      <p className="text-[#7c5e3c]">Min CGPA</p>
                      <p className="font-semibold text-[#451a03]">
                        {drive.minCgpa}
                      </p>
                    </div>

                    <div className="bg-[#fff7ed] p-3 rounded-lg border border-[#f3e2c7]">
                      <p className="text-[#7c5e3c]">Max Backlogs</p>
                      <p className="font-semibold text-[#451a03]">
                        {drive.maxBacklogs}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="text-xs text-[#7c5e3c] space-y-1">
                    <p>
                      <span className="font-semibold">Deadline:</span> {new Date(drive.deadline).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Drive Date:</span> {new Date(drive.driveDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#6b4f3a] line-clamp-2">
                    {drive.description}
                  </p>
                </div>

                {/* Register Button */}
                <div className="border-t border-[#f1e6d3] p-4">
                 <button
                   onClick={() => handleRegister(drive.id)}
                   disabled={registering[drive.id] || drive.registered} // disable if already applied
                   className="w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition bg-[#d97706] hover:bg-[#b45309] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {registering[drive.id] && (
                     <Loader size={18} className="animate-spin" />
                   )}
                   {registering[drive.id]
                     ? "Registering..."
                     : drive.registered
                       ? "Applied"
                       : "Register"}
                 </button>

                </div>
            </div>
          ))}
        </div>

        {drives.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No drives available</p>
          </div>
        )}
      </div>
    </div>
  )
}
