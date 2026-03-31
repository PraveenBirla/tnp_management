import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search } from 'lucide-react';
import AddStudentModal from './AddStudentModal';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/admin/all_students', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    if (!window.confirm('Are you sure you want to delete this student profile?'))
      return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/students/${studentId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        setStudents(students.filter((s) => s.id !== studentId));
      }
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  const handleStudentCreated = () => {
    fetchStudents();
    setShowAddModal(false);
    setEditingStudent(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-amber-900 text-lg">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-amber-900">Student Profiles</h2>
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Student
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by name, email, or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 bg-white"
        />
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-amber-200">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">
              {searchTerm ? 'No students found matching your search' : 'No students added yet'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold"
            >
              Add First Student
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Roll No</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Branch</th>
                  <th className="px-6 py-4 text-left font-semibold">Batch</th>
                  <th className="px-6 py-4 text-left font-semibold">CGPA</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b border-amber-100 hover:bg-amber-50 transition-all ${
                      index % 2 === 0 ? 'bg-white' : 'bg-amber-50'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-amber-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{student.rollNo}</td>
                    <td className="px-6 py-4 text-gray-700">{student.email}</td>
                    <td className="px-6 py-4 text-gray-700">
                      <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold">
                        {student.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{student.batch}</td>
                    <td className="px-6 py-4 font-semibold text-amber-700">
                      {student.cgpa}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingStudent(student);
                          setShowAddModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-semibold text-sm"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-semibold text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Student Modal */}
      {showAddModal && (
        <AddStudentModal
          student={editingStudent}
          onClose={() => {
            setShowAddModal(false);
            setEditingStudent(null);
          }}
          onSuccess={handleStudentCreated}
        />
      )}
    </div>
  );
}
