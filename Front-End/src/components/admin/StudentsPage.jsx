'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Search } from 'lucide-react';
import { fetchWithAuth } from '../../api/fetchWithAuth';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [branches, setBranches] = useState([]);
  const [years, setYears] = useState([]);



  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    // Extract unique branches and years from students
    const uniqueBranches = [...new Set(students.map(s => s.branch).filter(Boolean))];
    const uniqueYears = [...new Set(students.map(s => s.batch).filter(Boolean))];

    setBranches(uniqueBranches.sort());
    setYears(uniqueYears.sort());
  }, [students]);

  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBranch = selectedBranch === '' || student.branch === selectedBranch;
      const matchesYear = selectedYear === '' || student.batch === selectedYear;

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
    if (!window.confirm('Are you sure you want to delete this student profile?'))
      return;
    try {
      await fetchWithAuth(`admin/students/${studentId}`, { method: 'DELETE' });
      setStudents(students.filter((s) => s.id !== studentId));
    } catch (err) {
      setError('Failed to delete student');
      console.error('Failed to delete student:', err);
    }
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
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-amber-900">Student Profiles</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {/* Filter Section */}
      <div className="mb-6 bg-white p-6 rounded-xl shadow-md border-2 border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div className="relative">
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

          {/* Branch Filter */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 bg-white text-gray-700 font-medium"
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-600 bg-white text-gray-700 font-medium"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-amber-200">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              {searchTerm || selectedBranch || selectedYear ? 'No students found matching your filters' : 'No students to display'}
            </p>
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
                  <th className="px-6 py-4 text-left font-semibold">Year</th>
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
                    <td className="px-6 py-4">
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


    </div>
  );
}
