import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {fetchWithAuth} from "../../api/fetchWithAuth"
export default function CreateDriveModal({ onClose, onSuccess, drive = null, isEdit = false }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    packageLPA: '',
    eligibleBranches: [],
    targetYear: [],
    minCgpa: '',
    maxBacklogs: '',
    deadline: '',
    driveDate: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const branches = ['CS', 'BC', 'EC', 'ME', 'CE'];
  const years = [2025, 2026, 2027];

  // Pre-fill form with drive data for edit mode
  useEffect(() => {
    if (drive && isEdit) {
      setFormData({
        companyName: drive.companyName || '',
        jobRole: drive.jobRole || '',
        packageLPA: drive.packageLPA?.toString() || '',
        eligibleBranches: drive.eligibleBranches || [],
        targetYear: drive.targetYear || [],
        minCgpa: drive.minCgpa?.toString() || '',
        maxBacklogs: drive.maxBacklogs?.toString() || '',
        deadline: drive.deadline ? new Date(drive.deadline).toISOString().slice(0, 16) : '',
        driveDate: drive.driveDate ? new Date(drive.driveDate).toISOString().slice(0, 16) : '',
        description: drive.description || '',
      });
    }
  }, [drive, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBranchToggle = (branch) => {
    setFormData((prev) => ({
      ...prev,
      eligibleBranches: prev.eligibleBranches.includes(branch)
        ? prev.eligibleBranches.filter((b) => b !== branch)
        : [...prev.eligibleBranches, branch],
    }));
  };

  const handleYearToggle = (year) => {
    setFormData((prev) => ({
      ...prev,
      targetYear: prev.targetYear.includes(year)
        ? prev.targetYear.filter((y) => y !== year)
        : [...prev.targetYear, year],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        ...formData,
        packageLPA: parseFloat(formData.packageLPA),
        minCgpa: parseFloat(formData.minCgpa),
        maxBacklogs: parseInt(formData.maxBacklogs),
      };

      let response;
      if (isEdit && drive?.id) {
        // Update drive
        response = await fetchWithAuth(`/admin/update_drive/${drive.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new drive
        response = await fetchWithAuth('/admin/drive_post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save drive');
      }

      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to save drive');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`p-6 text-white sticky top-0 flex justify-between items-center ${
          isEdit
            ? 'bg-gradient-to-r from-blue-600 to-indigo-500'
            : 'bg-gradient-to-r from-amber-600 to-orange-500'
        }`}>
          <h2 className="text-2xl font-bold">
            {isEdit ? 'Edit Drive' : 'Create Drive'}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Job Role *
              </label>
              <input
                type="text"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Package (LPA) *
              </label>
              <input
                type="number"
                name="packageLPA"
                value={formData.packageLPA}
                onChange={handleInputChange}
                step="0.1"
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Min CGPA *
              </label>
              <input
                type="number"
                name="minCgpa"
                value={formData.minCgpa}
                onChange={handleInputChange}
                step="0.1"
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Max Backlogs *
              </label>
              <input
                type="number"
                name="maxBacklogs"
                value={formData.maxBacklogs}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Eligible Branches */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Eligible Branches *
            </label>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => (
                <button
                  key={branch}
                  type="button"
                  onClick={() => handleBranchToggle(branch)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    formData.eligibleBranches.includes(branch)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {branch}
                </button>
              ))}
            </div>
          </div>

          {/* Target Years */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Target Year *
            </label>
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => handleYearToggle(year)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    formData.targetYear.includes(year)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Deadline *
              </label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Drive Date *
              </label>
              <input
                type="datetime-local"
                name="driveDate"
                value={formData.driveDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-3 text-white rounded-lg font-semibold transition-all disabled:opacity-50 ${
                isEdit
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Drive' : 'Create Drive')}
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