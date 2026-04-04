import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import CreateDriveModal from './CreateDriveModal';
import { fetchWithAuth } from '../../api/fetchWithAuth'

export default function DrivesPage() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // ✅ Added missing state
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [registrations, setRegistrations] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('/admin/all_drives');

      if(response.ok){
      const data = await response.json();
      setDrives(data.data || []);
      setError(null);
      }
  else{
      setError("Failed to load drives");
       console.error("Error status:", response.status);
         }
    } catch (err) {
      setError('Failed to load drives');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async (driveId) => {
    try {
      const response = await fetchWithAuth(
        `/admin/drive/students_list/${driveId}`,
      );
  if(response.ok){
      const data = await response.json();
      setRegistrations((prev) => ({
        ...prev,
        [driveId]: data.data || [],
      }));
  }
    else{
      setError("Failed to Registrations");
       console.error("Error status:", response.status);
         }

    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    }
  };

  const handleEditDrive = (drive) => {
    setSelectedDrive(drive);
    setShowEditModal(true); // ✅ Now works
  };

  const handleDeleteDrive = async (driveId) => {
    if (!window.confirm('Are you sure you want to delete this drive?')) return;
    try {
      const response = await fetchWithAuth(`/admin/delete_drive/${driveId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setDrives(drives.filter((d) => d.id !== driveId));
        // Clear registrations
        setRegistrations((prev) => {
          const newRegs = { ...prev };
          delete newRegs[driveId];
          return newRegs;
        });
      }
    } catch (err) {
      console.error('Failed to delete drive:', err);
    }
  };

  const handleDriveCreated = () => {
    fetchDrives();
    setShowCreateModal(false);
  };

  const handleDriveUpdated = () => { // ✅ Added missing handler
    fetchDrives();
    setShowEditModal(false);
    setSelectedDrive(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-700 text-lg">Loading drives...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] min-h-screen">
      {/* Header */}
      <div className="relative">
        <div className="flex justify-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Placement Drives
          </h2>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-6 right-8 flex items-center gap-2 px-4 py-2 bg-[#451a03] hover:bg-[#2d1102] text-white rounded-xl font-semibold shadow-md transition"
        >
          <Plus size={20} />
          Add
        </button>
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
              <div>
                <p className="text-sm text-[#7c5e3c]">Package</p>
                <p className="text-2xl font-bold text-[#d97706]">
                  ₹{drive.packageLPA} LPA
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-[#fff7ed] p-3 rounded-lg border border-[#f3e2c7]">
                  <p className="text-[#7c5e3c]">Min CGPA</p>
                  <p className="font-semibold text-[#451a03]">
                    {drive.minCgpa}
                  </p>
                </div>
                <div className="bg-[#fff7ed] p-3 rounded-lg border border-[#f3e2c7]">
                  <p className="text-[#7c5e3c]">Backlogs</p>
                  <p className="font-semibold text-[#451a03]">
                    {drive.maxBacklogs}
                  </p>
                </div>
              </div>

              <div className="text-xs text-[#7c5e3c] space-y-1">
                <p>Deadline: {new Date(drive.deadline).toLocaleDateString()}</p>
                <p>Drive Date: {new Date(drive.driveDate).toLocaleDateString()}</p>
              </div>

              <p className="text-sm text-[#6b4f3a] line-clamp-2">
                {drive.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex border-t border-[#f1e6d3]">
              <button
                onClick={() => {
                  setSelectedDrive(drive);
                  fetchRegistrations(drive.id);
                  setShowViewModal(true);
                }}
                className="flex-1 py-2 text-sm font-medium text-[#451a03] hover:bg-[#fdf6ec] transition"
              >
                View
              </button>

              <button
                onClick={() => handleEditDrive(drive)} // ✅ Fixed: Now calls handleEditDrive
                className="flex-1 py-2 text-sm font-medium text-[#7c5e3c] hover:bg-[#fdf6ec] border-l border-[#f1e6d3]"
              >
                <Edit2 size={16} className="inline mr-1" />
                Edit
              </button>

              <button
                onClick={() => handleDeleteDrive(drive.id)}
                className="flex-1 py-2 text-sm font-medium text-red-500 hover:bg-red-50 border-l border-[#f1e6d3]"
              >
                <Trash2 size={16} className="inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {drives.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600 mb-4">No drives found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl font-semibold"
          >
            Create First Drive
          </button>
        </div>
      )}

      {/* Create Drive Modal */}
      {showCreateModal && (
        <CreateDriveModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleDriveCreated}
        />
      )}

      {/* Edit Drive Modal - Uses same CreateDriveModal */}
      {showEditModal && selectedDrive && (
        <CreateDriveModal
          drive={selectedDrive}
          isEdit={true}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDrive(null);
          }}
          onSuccess={handleDriveUpdated}
        />
      )}

      {/* Registrations Modal */}
      {showViewModal && selectedDrive && registrations[selectedDrive.id] && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#fffdf7] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-xl border border-[#f1e6d3]">
            <div className="flex items-center justify-between p-4 border-b border-[#f1e6d3]">
              <div>
                <h3 className="text-lg font-semibold text-[#451a03]">
                  {selectedDrive.companyName}
                </h3>
                <p className="text-sm text-[#7c5e3c]">Registrations</p>
              </div>
              <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedDrive(null);
                    }}
                    className="text-[#7c5e3c] hover:text-[#451a03] text-lg"
                  >
                    ✕
                  </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {!registrations[selectedDrive.id] ? (
                <p className="text-center text-[#7c5e3c] py-10">Loading...</p>
              ) : registrations[selectedDrive.id].length === 0 ? (
                <p className="text-center text-[#7c5e3c] py-10">No registrations yet</p>
              ) : (
                <div className="overflow-hidden border border-[#f1e6d3] rounded-xl">
                  <div className="grid grid-cols-2 bg-[#fff7ed] text-[#451a03] font-semibold text-sm">
                    <div className="px-4 py-3 border-r border-[#f1e6d3]">Student Name</div>
                    <div className="px-4 py-3">Enrollment No</div>
                  </div>
                  {registrations[selectedDrive.id].map((student, index) => (
                    <div
                      key={student.id}
                      className={`grid grid-cols-2 text-sm ${
                        index % 2 === 0 ? "bg-[#fffdf7]" : "bg-[#fdf6ec]"
                      } hover:bg-[#f9ecd9] transition`}
                    >
                      <div className="px-4 py-3 border-t border-[#f1e6d3] border-r">
                        {student.studentName}
                      </div>
                      <div className="px-4 py-3 border-t border-[#f1e6d3]">
                        {student.studentEnrollmentNo}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#f1e6d3]">
              <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedDrive(null);
                    }}
                    className="w-full py-2.5 bg-[#C08552] hover:bg-[#8C5A3C] text-white rounded-lg font-medium transition"
                  >
                    Close
                  </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}