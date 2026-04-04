    import React, { useState, useEffect } from 'react';
    import { X } from 'lucide-react';
    import {fetchWithAuth} from '../../api/fetchWithAuth'

    export default function CreateEventModal({ event, onClose, onSuccess }) {
      const [formData, setFormData] = useState({
        title: '',
        location: '',
        dateTime: '',
        eligibleBatches: [],
        eligibleBranch: [],
      });

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const token = localStorage.getItem('token');
      const branches = ['CS', 'BC', 'EC', 'ME', 'CE'];
      const batches = [2025, 2026, 2027];

      useEffect(() => {
        if (event) {
          setFormData({
            title: event.title,
            location: event.location,
            dateTime: event.dateTime,
            eligibleBatches: event.eligibleBatches || [],
            eligibleBranch: event.eligibleBranch || [],
          });
        }
      }, [event]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleBatchToggle = (batch) => {
        setFormData((prev) => ({
          ...prev,
          eligibleBatches: prev.eligibleBatches.includes(batch)
            ? prev.eligibleBatches.filter((b) => b !== batch)
            : [...prev.eligibleBatches, batch],
        }));
      };

      const handleBranchToggle = (branch) => {
        setFormData((prev) => ({
          ...prev,
          eligibleBranch: prev.eligibleBranch.includes(branch)
            ? prev.eligibleBranch.filter((b) => b !== branch)
            : [...prev.eligibleBranch, branch],
        }));
      };



      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
          const url = event
            ? `/admin/events/${event.id}`
            : '/admin/events/add';

          const method = event ? 'PUT' : 'POST';

          const response = await fetchWithAuth(url, {
            method,
            headers: {
              'Content-Type': 'application/json',

            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('Failed to save event');
          }

          onSuccess();
        } catch (err) {
          setError(err.message || 'Failed to save event');
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white sticky top-0 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {event ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Eligible Batches */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Eligible Batches *
                </label>
                <div className="flex flex-wrap gap-2">
                  {batches.map((batch) => (
                    <button
                      key={batch}
                      type="button"
                      onClick={() => handleBatchToggle(batch)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        formData.eligibleBatches.includes(batch)
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                      }`}
                    >
                      {batch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eligible Branches */}
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">
                  Eligible Branches *
                </label>
                <div className="flex flex-wrap gap-2">
                  {branches.map((branch) => (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => handleBranchToggle(branch)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        formData.eligibleBranch.includes(branch)
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                      }`}
                    >
                      {branch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
