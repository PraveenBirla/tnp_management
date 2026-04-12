 'use client';

 import React, { useState, useEffect } from 'react';
 import { Trash2, Search, Filter, FileText, CheckCircle, AlertCircle, Eye } from 'lucide-react';
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
   const [currentPage, setCurrentPage] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [pageSize] = useState(10);

   // 🔥 Placement Modal State
   const [showModal, setShowModal] = useState(false);
   const [selectedStudent, setSelectedStudent] = useState(null);
   const [placementData, setPlacementData] = useState({
     companyName: '',
     role: '',
     packageAmount: '',
     placementDate: '',
   });

   // ✅ Fetch Students with Pagination
   useEffect(() => {
     fetchStudents();
   }, [currentPage, searchTerm, selectedBranch, selectedYear]);

   // ✅ Dynamic Year Filter
   useEffect(() => {
     const currentYear = new Date().getFullYear();
     const yearList = [];
     for (let i = currentYear - 10; i <= currentYear + 4; i++) {
       yearList.push(i);
     }
     setYears(yearList);
   }, []);

   const fetchStudents = async () => {
     try {
       setLoading(true);

       const params = new URLSearchParams({
         page: currentPage.toString(),
         size: pageSize.toString(),
       });

       // ✅ Add filters only if selected (now backend handles all cases)
       if (selectedBranch) params.append('branch', selectedBranch);
       if (selectedYear) params.append('year', selectedYear);

       const url = `/admin/all_students?${params}`;
       console.log('🌐 API:', url); // Remove in production

       const response = await fetchWithAuth(url);

       if (!response.ok) {
         throw new Error(`HTTP ${response.status}`);
       }

       const data = await response.json();

       // 🔥 Backend Page Response Format
       setStudents(data.data.content || []);
       setTotalPages(data.data.totalPages || 1);
       setError(null);
     } catch (err) {
       console.error('Fetch Error:', err);
       setError('Failed to load students');
     } finally {
       setLoading(false);
     }
   };



   // 🔥 Verify Student
   const handleVerifyStudent = async (studentId) => {
     if (!window.confirm('Mark this student as verified?')) return;

     try {
       await fetchWithAuth(`/admin/mark-verified/${studentId}`, {
         method: 'POST',
       });
       fetchStudents();
     } catch (err) {
       setError('Failed to verify student');
       console.error(err);
     }
   };

   // 🔥 Placement Modal Functions
   const openPlacementForm = (student) => {
     setSelectedStudent(student);
     setShowModal(true);
   };

   const handlePlacementSubmit = async () => {
     try {
       await fetchWithAuth(`/admin/place-student/${selectedStudent.id}`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(placementData),
       });

       setShowModal(false);
       setPlacementData({ companyName: '', role: '', packageAmount: '', date: '' });
       setSelectedStudent(null);
       fetchStudents();
     } catch (err) {
       alert('Failed to save placement');
     }
   };

   // Pagination
   const goToPage = (page) => {
     setCurrentPage(page);
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
         <p className="text-slate-600">Manage and track student placements & verification</p>
       </div>

       {/* Filters */}
       <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
         <div className="flex items-center gap-2 mb-4">
           <Search className="w-5 h-5 text-slate-400" />
           <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="md:col-span-1">
             <input
               type="text"
               placeholder="Search by name or enrollment..."
               className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
               onChange={(e) => setSearchTerm(e.target.value)}
               value={searchTerm}
             />
           </div>
           <div>
             <select
               onChange={(e) => setSelectedBranch(e.target.value)}
               value={selectedBranch}
               className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
             >
               <option value="">All Branches</option>
               <option value="CS">Computer Science (CS)</option>
               <option value="EC">Electronics (EC)</option>
               <option value="AI">Artificial Intelligence (AI)</option>
               <option value="CE">Civil Engineering (CE)</option>
               <option value="ME">Mechanical (ME)</option>
               <option value="IT">Information Tech (IT)</option>
               <option value="BC">Block Chain</option>
             </select>
           </div>
           <div>
             <select
               onChange={(e) => setSelectedYear(e.target.value)}
               value={selectedYear}
               className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
             >
               <option value="">All Years</option>
               {years.map((y) => (
                 <option key={y} value={y}>{y}</option>
               ))}
             </select>
           </div>
         </div>
       </div>

       {/* Results Count */}
       <div className="mb-4">
         <p className="text-sm text-slate-600">
           Showing <span className="font-semibold">{students.length}</span> students
           (Page {currentPage + 1} of {totalPages})
         </p>
       </div>

       {/* Table */}
       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full table-fixed">
             <thead>
               <tr className="border-b border-slate-200 bg-slate-50">
                 <th className="w-[15%]  px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Name</th>
                 <th className="w-[15%]  px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Enrollment</th>
                 <th className="w-[10%] px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Branch</th>
                 <th className="w-[10%] px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Year</th>
                 <th className="w-[8%] px-3 py-3 px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">10th</th>
                 <th className="w-[8%] px-3 py-3 px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">12th</th>
                 <th className="w-[8%] px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Last Sem</th>
                 <th className="  w-[10%] px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                 <th className="w-[16]%] px-6 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-200">
               {students.length > 0 ? (
                 students.map((student) => (
                   <tr key={student.id} className="hover:bg-slate-50">
                     <td className="px-4 py-3 text-sm font-medium text-slate-900">{student.fullName}</td>
                     <td className="px-4 py-3 text-sm text-slate-600 font-mono">{student.studentEnrollmentNo}</td>
                     <td className="px-4 py-3 text-sm">
                       <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                         {student.branch}
                       </span>
                     </td>
                     <td className="px-4 py-3 text-sm text-slate-600">{student.passoutYear}</td>

                     {/* 10th Marksheet */}
                     <td className="px-3 py-3 text-xs">
                       {student.tenthMarksheetUrl ? (
                         <a href={student.tenthMarksheetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                           <FileText size={14} /> View
                         </a>
                       ) : (
                         <span className="text-slate-400">—</span>
                       )}
                     </td>

                     {/* 12th Marksheet */}
                     <td className="px-3 py-3 text-xs">
                       {student.twelfthMarksheetUrl ? (
                         <a href={student.twelfthMarksheetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                           <FileText size={14} /> View
                         </a>
                       ) : (
                         <span className="text-slate-400">—</span>
                       )}
                     </td>

                     {/* Last Semester */}
                     <td className="px-3 py-3 text-xs">
                       {student.lastSemesterMarkSheetUrl ? (
                         <a href={student.lastSemesterMarkSheetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                           <FileText size={14} /> View
                         </a>
                       ) : (
                         <span className="text-slate-400">—</span>
                       )}
                     </td>

                     <td className="px-4 py-3 text-sm">
                       <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                         student.verified
                           ? 'bg-green-100 text-green-800'
                           : 'bg-yellow-100 text-yellow-800'
                       }`}>
                         {student.verified ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                         {student.verified ? 'Verified' : 'Pending'}
                       </span>
                     </td>

                     <td className="px-6 py-3">
                       <div className="flex items-center justify-center gap-2">
                         {/* Verify Button */}
                         {!student.verified && (
                           <button
                             onClick={() => handleVerifyStudent(student.id)}
                             className="px-2.5 py-1.5 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors font-medium"
                           >
                             Verify
                           </button>
                         )}

                         {/* Placement Button */}
                         <button
                           disabled={student.placed}
                           onClick={() => openPlacementForm(student)}
                           className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                             student.placed
                               ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                               : 'bg-blue-600 text-white hover:bg-blue-700'
                           }`}
                         >
                           {student.placed ? 'Placed' : 'Place'}
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan="9" className="px-6 py-12 text-center">
                     <p className="text-slate-500 font-medium">No students found</p>
                   </td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>

         {/* Pagination */}
         {totalPages > 1 && (
           <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
             <div className="flex items-center justify-between">
               <div className="text-sm text-slate-600">
                 Page {currentPage + 1} of {totalPages}
               </div>
               <div className="flex gap-1">
                 <button
                   onClick={() => goToPage(0)}
                   disabled={currentPage === 0}
                   className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   First
                 </button>
                 <button
                   onClick={() => goToPage(currentPage - 1)}
                   disabled={currentPage === 0}
                   className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   Prev
                 </button>
                 <button
                   onClick={() => goToPage(currentPage + 1)}
                   disabled={currentPage === totalPages - 1}
                   className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   Next
                 </button>
                 <button
                   onClick={() => goToPage(totalPages - 1)}
                   disabled={currentPage === totalPages - 1}
                   className="px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   Last
                 </button>
               </div>
             </div>
           </div>
         )}
       </div>

       {/* Placement Modal - SAME AS BEFORE */}
       {showModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
             <div className="px-6 py-4 border-b border-slate-200">
               <h3 className="text-lg font-semibold text-slate-900">Mark Student as Placed</h3>
               <p className="text-sm text-slate-600 mt-1">{selectedStudent?.fullName}</p>
             </div>
             <div className="px-6 py-4 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                 <input
                   type="text"
                   placeholder="Enter company name"
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                   onChange={(e) => setPlacementData({ ...placementData, companyName: e.target.value })}
                   value={placementData.companyName}
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Job Role</label>
                 <input
                   type="text"
                   placeholder="e.g., Software Engineer"
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                   onChange={(e) => setPlacementData({ ...placementData, role: e.target.value })}
                   value={placementData.role}
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Package (LPA)</label>
                 <input
                   type="number"
                   placeholder="e.g., 12.5"
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                   onChange={(e) => setPlacementData({ ...placementData, packageAmount: Number(e.target.value) })}
                   value={placementData.packageAmount}
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                 <input
                   type="date"
                   className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                   onChange={(e) => setPlacementData({ ...placementData, placementDate: e.target.value })}
                   value={placementData.date}
                 />
               </div>
             </div>
             <div className="px-6 py-4 border-t border-slate-200 flex gap-3 justify-end">
               <button
                 onClick={() => {
                   setShowModal(false);
                   setPlacementData({ companyName: '', role: '', packageAmount: '', date: '' });
                 }}
                 className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
               >
                 Cancel
               </button>
               <button
                 onClick={handlePlacementSubmit}
                 className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                 disabled={!placementData.companyName || !placementData.role}
               >
                 Save Placement
               </button>
             </div>
           </div>
         </div>
       )}

       {error && (
         <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-lg">
           {error}
         </div>
       )}
     </div>
   );
 }