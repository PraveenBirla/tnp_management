import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users } from 'lucide-react'

export default function StudentEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/student/events/my-list', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setEvents(data.data || [])
      setError(null)
    } catch (err) {
      setError('Failed to load events')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-700 text-lg">Loading events...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] p-8">
      <div className="max-w-7xl  mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="text-[#7c5e3c]">Don&apos;t miss important placement-related events</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#fffdf7] rounded-2xl border border-[#f1e6d3] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header */}
              <div className="p-4 border-b border-[#f1e6d3]">
                <h3 className="text-lg font-semibold text-[#d97706]">
                  {event.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Date and Time */}
                <div className="flex items-start gap-3">
                  <Calendar size={20} className="text-[#d97706] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#7c5e3c]">Date & Time</p>
                    <p className="font-semibold text-[#451a03]">
                      {new Date(event.dateTime).toLocaleDateString()}
                      <span className="ml-2">
                        {new Date(event.dateTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#d97706] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#7c5e3c]">Location</p>
                    <p className="font-semibold text-[#451a03]">{event.location}</p>
                  </div>
                </div>

                {/* Eligible Info */}
                <div className="flex items-start gap-3">
                  <Users size={20} className="text-[#d97706] mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-[#7c5e3c] mb-1">Eligible Batches</p>
                    <p className="font-semibold text-[#451a03]">
                      {event.eligibleBatches?.join(', ') || 'All'}
                    </p>
                    <p className="text-[#7c5e3c] mt-2 mb-1">Eligible Branches</p>
                    <p className="font-semibold text-[#451a03]">
                      {event.eligibleBranch?.join(', ') || 'All'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#f1e6d3] p-4">
                <button
                  className="w-full py-2.5 bg-[#d97706] hover:bg-[#b45309] text-white rounded-lg font-medium transition"
                >
                  Mark as Interested
                </button>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No events scheduled</p>
          </div>
        )}
      </div>
    </div>
  )
}
