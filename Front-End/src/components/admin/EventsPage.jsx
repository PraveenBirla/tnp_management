import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import CreateEventModal from './CreateEventModal';
import {fetchWithAuth}  from '../../api/fetchWithAuth'
export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEvents();
  }, []);




  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('/admin/events/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setEvents(data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await fetchWithAuth(
        `/admin/events/${eventId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        setEvents(events.filter((e) => e.id !== eventId));
      }
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  const handleEventCreated = () => {
    fetchEvents();
    setShowCreateModal(false);
    setEditingEvent(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#451a03] text-lg">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#FFFFF0] min-h-screen">

      {/* Header */}
      <div className="relative">

        <div className="flex justify-center mb-8">
          <h2 className="text-2xl font-bold text-[#451a03]">
            Events
          </h2>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => {
            setEditingEvent(null);
            setShowCreateModal(true);
          }}
          className="fixed bottom-6 right-8 flex items-center gap-2 px-4 py-2 bg-[#451a03] hover:bg-[#2d1102] text-white rounded-xl font-semibold shadow-md transition"
        >
          <Plus size={20} />
          Add
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-[#fff1f0] border border-[#f5c2c0] text-red-600 rounded-lg">
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
              <p className="text-sm text-[#7c5e3c]">
                Event
              </p>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">

              {/* Date */}
              <div>
                <p className="text-sm text-[#7c5e3c]">Date & Time</p>
                <p className="font-semibold text-[#451a03]">
                  {new Date(event.dateTime).toLocaleString()}
                </p>
              </div>

              {/* Location */}
              <div>
                <p className="text-sm text-[#7c5e3c]">Location</p>
                <p className="font-semibold text-[#451a03]">
                  {event.location}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm">

                <div className="bg-[#fff7ed] p-3 rounded-lg border border-[#f3e2c7]">
                  <p className="text-[#7c5e3c]">Batches</p>
                  <p className="font-semibold text-[#451a03]">
                    {event.eligibleBatches?.join(', ') || 'N/A'}
                  </p>
                </div>

                <div className="bg-[#fff7ed] p-3 rounded-lg border border-[#f3e2c7]">
                  <p className="text-[#7c5e3c]">Branches</p>
                  <p className="font-semibold text-[#451a03]">
                    {event.eligibleBranch?.join(', ') || 'N/A'}
                  </p>
                </div>

              </div>

            </div>

            {/* Actions */}
            <div className="flex border-t border-[#f1e6d3]">

              <button
                onClick={() => {
                  setEditingEvent(event);
                  setShowCreateModal(true);
                }}
                className="flex-1 py-2 text-sm font-medium text-[#451a03] hover:bg-[#fdf6ec] transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="flex-1 py-2 text-sm font-medium text-red-500 hover:bg-red-50 border-l border-[#f1e6d3]"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-[#7c5e3c] mb-4">No events found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl font-semibold"
          >
            Create First Event
          </button>
        </div>
      )}

      {/* Modal */}
      {showCreateModal && (
        <CreateEventModal
          event={editingEvent}
          onClose={() => {
            setShowCreateModal(false);
            setEditingEvent(null);
          }}
          onSuccess={handleEventCreated}
        />
      )}

    </div>
  );
}