'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Search, Filter } from 'lucide-react';
import { fetchWithAuth } from '../../api/fetchWithAuth';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const [years, setYears] = useState([]);

  // 🔥 Placement Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [placementData, setPlacementData] = useState({
    companyName: '',
    role: '',
    packageAmount: '',
    date: '',
  });

  // ✅ Fetch Students
  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Dynamic Year Filter (last 10 → next 4)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];

    for (let i = currentYear - 10; i <= currentYear + 4; i++) {
      yearList.push(i);
    }

    setYears(yearList);
  }, []);

  // ✅ Filtering Logic
  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentEnrollmentNo?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBranch = selectedBranch === '' || student.branch === selectedBranch;
      const matchesYear = selectedYear === '' || student.passoutYear === Number(selectedYear);

      return matchesSearch && matchesBranch && matchesYear;
    });

    setFilteredStudents(filtered);
  }, [searchTerm, students, selectedBranch, selectedYear]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('/admin/all_students');
      const data = await response.json();
      setStudents(data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student profile?')) return;

    try {
      await fetchWithAuth(`admin/students/${studentId}`, { method: 'DELETE' });
      setStudents(students.filter((s) => s.id !== studentId));
    } catch (err) {
      setError('Failed to delete student');
      console.error(err);
    }
  };

  // 🔥 Open Modal
  const openPlacementForm = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // 🔥 Submit Placement
  const handlePlacementSubmit = async () => {
    try {
      await fetchWithAuth(`/admin/place-student/${selectedStudent.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placementData),
      });

      setShowModal(false);
      setPlacementData({
        companyName: '',
        role: '',
        packageAmount: '',
        date: '',
      });

      fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Failed to save placement');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Profiles</h1>
        <p className="text-slate-600">Manage and track student placements</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="Search by name or enrollment..."
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>

          {/* Branch Filter */}
          <div>
            <select
              onChange={(e) => setSelectedBranch(e.target.value)}
              value={selectedBranch}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
            >
              <option value="">All Branches</option>
              <option value="CS">Computer Science (CS)</option>
              <option value="EC">Electronics (EC)</option>
              <option value="AI">Artificial Intelligence (AI)</option>
              <option value="CE">Civil Engineering (CE)</option>
              <option value="ME">Mechanical (ME)</option>
              <option value="IT">Information Tech (IT)</option>
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              value={selectedYear}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
            >
              <option value="">All Passout Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === new Date().getFullYear() ? `${y} (Current)` : y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filteredStudents.length}</span> of{' '}
          <span className="font-semibold text-slate-900">{students.length}</span> students
        </p>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Passout Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {student.studentEnrollmentNo}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {student.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {student.passoutYear}
                    </td>
                     <td className="px-6 py-4 text-sm">
                                           <span
                                             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                               student.placed
                                                 ? 'bg-green-100 text-green-800'
                                                 : 'bg-slate-100 text-slate-700'
                                             }`}
                                           >
                                             {student.placed ? 'Placed' : 'Not Placed'}
                                           </span>
                                         </td>
                                         <td className="px-6 py-4 text-sm">
                                           <div className="flex items-center justify-center gap-2">
                                             {/* Placement Button */}
                                             <button
                                               disabled={student.placed}
                                               onClick={() => openPlacementForm(student)}
                                               className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                                 student.placed
                                                   ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                   : 'bg-blue-600 text-white hover:bg-blue-700'
                                               }`}
                                             >
                                               {student.placed ? 'Placed' : 'Mark Placed'}
                                             </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete student"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <p className="text-slate-500 font-medium">No students found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Placement Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Mark Student as Placed</h3>
              <p className="text-sm text-slate-600 mt-1">{selectedStudent?.fullName}</p>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onChange={(e) =>
                    setPlacementData({ ...placementData, companyName: e.target.value })
                  }
                  value={placementData.companyName}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Role
                </label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer, Data Analyst"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onChange={(e) =>
                    setPlacementData({ ...placementData, role: e.target.value })
                  }
                  value={placementData.role}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Package (LPA)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 12.5"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onChange={(e) =>
                    setPlacementData({ ...placementData, packageAmount: e.target.value })
                  }
                  value={placementData.packageAmount}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onChange={(e) =>
                    setPlacementData({ ...placementData, date: e.target.value })
                  }
                  value={placementData.date}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPlacementData({
                    companyName: '',
                    role: '',
                    packageAmount: '',
                    date: '',
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handlePlacementSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                Save Placement
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
