 import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { Save, Loader, FileText, Upload, CheckCircle, AlertCircle, Edit3, User, Phone, BookOpen, GraduationCap, Code } from "lucide-react";
 import { fetchWithAuth } from "../../api/fetchWithAuth";
 import StudentTopNavbar from "./StudentTopNavbar";

 export default function StudentProfilePage() {
   const navigate = useNavigate();
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);
   const [saving, setSaving] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [isVerified, setIsVerified] = useState(false);
   const [verificationChecked, setVerificationChecked] = useState(false);

   const [formData, setFormData] = useState({
     fullName: "",
     cgpa: "",
     studentEnrollmentNo: "",
     branch: "",
     passoutYear: new Date().getFullYear(),
     skills: "",
     phoneNumber: "",
   });

   const [files, setFiles] = useState({
     resume: null,
     tenth: null,
     twelfth: null,
     lastsemester: null,
   });

   useEffect(() => {
     checkVerificationStatus();
   }, []);

   const checkVerificationStatus = async () => {
     try {
       setLoading(true);
       const response = await fetchWithAuth("/student/profile/verify");

       if (response.ok) {
         const result = await response.json();
         const isVerified = result?.data?.verified === true;

         if (!isVerified) {
           navigate("/student/profile-pending");
           return;
         }

         setIsVerified(true);
         setVerificationChecked(true);
         await fetchProfile();
       } else {
         navigate("/student/create-profile");
       }
     } catch (err) {
       navigate("/student/create-profile");
     } finally {
       setLoading(false);
     }
   };

   const fetchProfile = async () => {
     try {
       const response = await fetchWithAuth("/student/get-profile");

       if (!response.ok) {
         setProfile(null);
         setIsEditing(true);
         return;
       }

       const result = await response.json();
       if (result?.data) {
         setProfile(result.data);
         setFormData({
           fullName: result.data.fullName || "",
           cgpa: result.data.cgpa || "",
           studentEnrollmentNo: result.data.studentEnrollmentNo || "",
           branch: result.data.branch || "",
           passoutYear: result.data.passoutYear || new Date().getFullYear(),
           skills: result.data.skills || "",
           phoneNumber: result.data.phoneNumber || "",
         });
         setIsEditing(false);
       } else {
         setIsEditing(true);
       }
     } catch (err) {
       setError("Failed to load profile details.");
     }
   };

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleFileChange = (e) => {
     const { name, files: selectedFiles } = e.target;
     if (selectedFiles.length > 0) {
       setFiles((prev) => ({
         ...prev,
         [name]: selectedFiles[0],
       }));
     }
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setSaving(true);
     setError(null);
     setSuccess(false);

     try {
       if (!profile && !files.resume) {
         setError("Resume is required");
         setSaving(false);
         return;
       }

       const dtoData = {
         ...formData,
         cgpa: Number(formData.cgpa),
         passoutYear: Number(formData.passoutYear),
       };

       const formDataToSend = new FormData();
       formDataToSend.append(
         "data",
         new Blob([JSON.stringify(dtoData)], {
           type: "application/json",
         })
       );

       Object.entries(files).forEach(([key, file]) => {
         if (file) {
           formDataToSend.append(key === "lastsemester" ? "lastSemesterMarkSheet" : key, file);
         }
       });

       const response = await fetchWithAuth("/student/get-profile", {
         method: profile ? "PUT" : "POST",
         body: formDataToSend,
       });

       if (response.ok) {
         setSuccess(true);
         setTimeout(() => setSuccess(false), 3000);
         await fetchProfile();
         setIsEditing(false);
         setFiles({
           resume: null,
           tenth: null,
           twelfth: null,
           lastsemester: null,
         });
       } else {
         const errResult = await response.json();
         setError(errResult.error?.message || "Failed to save profile.");
       }
     } catch (err) {
       setError("Server error. Check your connection or file sizes.");
     } finally {
       setSaving(false);
     }
   };

   if (loading || !verificationChecked) {
     return (
       <div className="min-h-screen bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] flex items-center justify-center">
         <div className="text-center">
           <Loader className="w-12 h-12 animate-spin text-[#d97706] mx-auto mb-4" />
           <p className="text-[#5d4037] text-lg">Verifying your profile...</p>
         </div>
       </div>
     );
   }

   return (
     <div className="min-h-screen bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] p-8">
       <div className="max-w-7xl mx-auto">
         {/* Header */}
         <div className="flex justify-center mb-8">
           <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
         </div>

         {/* Notifications */}
         {success && (
           <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
             <p className="font-semibold">Success! Your profile has been saved.</p>
           </div>
         )}

         {error && (
           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
             {error}
           </div>
         )}

         {isEditing ? (
           /* Compact Edit Form */
           <div className="bg-[#fffdf7] rounded-2xl border border-[#f1e6d3] shadow-sm p-6 max-w-2xl mx-auto">
             <form onSubmit={handleSubmit} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-[#7c5e3c] mb-1">Full Name</label>
                   <input className="w-full p-2.5 rounded-lg border border-[#f1e6d3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]" name="fullName" value={formData.fullName} onChange={handleChange} required />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-[#7c5e3c] mb-1">CGPA</label>
                   <input className="w-full p-2.5 rounded-lg border border-[#f1e6d3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]" type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} required />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-[#7c5e3c] mb-1">Enrollment No.</label>
                   <input className="w-full p-2.5 rounded-lg border border-[#f1e6d3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]" name="studentEnrollmentNo" value={formData.studentEnrollmentNo} onChange={handleChange} required />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-[#7c5e3c] mb-1">Branch</label>
                   <select className="w-full p-2.5 rounded-lg border border-[#f1e6d3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]" name="branch" value={formData.branch} onChange={handleChange} required>
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
                   <label className="block text-sm font-medium text-[#7c5e3c] mb-1">Passout Year</label>
                   <input className="w-full p-2.5 rounded-lg border border-[#f1e6d3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]" type="number" name="passoutYear" value={formData.passoutYear} onChange={handleChange} required />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-[#7c5e3c] mb-1">Phone</label>
                   <input className="w-full p-2.5 rounded-lg border border-[#f1e6d3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-[#7c5e3c] mb-1">Skills</label>
                 <input className="w-full p-2.5 rounded-lg border border-[#f1e6d3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]" name="skills" value={formData.skills} onChange={handleChange} placeholder="Java, Spring Boot, MySQL" />
               </div>

               {/* Compact File Upload */}
               <div>
                 <h4 className="text-sm font-semibold text-[#d97706] mb-2">Documents</h4>
                 <div className="grid grid-cols-2 gap-2 text-xs">
                   {[
                     { key: "resume", label: "Resume" },
                     { key: "tenth", label: "10th" },
                     { key: "twelfth", label: "12th" },
                     { key: "lastsemester", label: "Last Sem" },
                   ].map((fileItem) => (
                     <label key={fileItem.key} className="flex items-center gap-1 p-2 border border-dashed border-[#f1e6d3] rounded cursor-pointer hover:bg-[#fff7ed] text-[#7c5e3c]">
                       📄 {files[fileItem.key]?.name ? files[fileItem.key].name.slice(0,15)+'...' : fileItem.label}
                       <input type="file" name={fileItem.key} onChange={handleFileChange} className="hidden" accept=".pdf" />
                     </label>
                   ))}
                 </div>
               </div>

               <div className="flex gap-3 pt-2 border-t border-[#f1e6d3]">
                 <button type="submit" disabled={saving} className="flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-1 text-sm bg-[#d97706] hover:bg-[#b45309] text-white disabled:opacity-50">
                   {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} />} Save
                 </button>
                 <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-[#f1e6d3] text-[#7c5e3c] text-sm rounded-lg hover:bg-[#fff7ed]">
                   Cancel
                 </button>
               </div>
             </form>
           </div>
         ) : (
           /* COMPACT VIEW - Same size as drives cards */
           <div className="bg-[#fffdf7] rounded-2xl border border-[#f1e6d3] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 max-w-sm mx-auto">
             {/* Compact Header */}
             <div className="p-4 border-b border-[#f1e6d3]">
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-[#d97706]/20 rounded-full flex items-center justify-center">
                   <User size={24} className="text-[#d97706]" />
                 </div>
                 <div>
                   <h3 className="text-lg font-semibold text-[#d97706]">{profile?.fullName}</h3>
                   <p className="text-sm text-[#7c5e3c]">{profile?.branch} • {profile?.passoutYear}</p>
                 </div>
               </div>
             </div>

             {/* Compact Content */}
             <div className="p-5 space-y-3">
               {/* CGPA & Enrollment */}
               <div className="grid grid-cols-2 gap-2">
                 <div className="bg-[#fff7ed] p-2.5 rounded-lg border border-[#f3e2c7] text-xs">
                   <p className="text-[#7c5e3c]">CGPA</p>
                   <p className="font-semibold text-[#451a03] text-lg">{profile?.cgpa}</p>
                 </div>
                 <div className="bg-[#fff7ed] p-2.5 rounded-lg border border-[#f3e2c7] text-xs">
                   <p className="text-[#7c5e3c]">Enrollment</p>
                   <p className="font-semibold text-[#451a03]">{profile?.studentEnrollmentNo}</p>
                 </div>
               </div>

               {/* Phone */}
               <div className="bg-[#fff7ed] p-3 rounded-lg border border-[#f3e2c7]">
                 <p className="text-xs text-[#7c5e3c]">Phone</p>
                 <p className="font-semibold text-[#451a03] text-sm">{profile?.phoneNumber}</p>
               </div>

               {/* Skills */}
               {profile?.skills && (
                 <div>
                   <p className="text-xs text-[#7c5e3c] mb-1">Skills</p>
                   <div className="flex flex-wrap gap-1">
                     {profile.skills.split(",").map((skill, i) => (
                       <span key={i} className="text-xs bg-[#fff7ed] px-2 py-1 rounded text-[#d97706] border border-[#f3e2c7]">
                         {skill.trim()}
                       </span>
                     ))}
                   </div>
                 </div>
               )}

               {/* Documents - Compact */}
               {/* Professional PDF Grid - 2 PER ROW */}
               <div>
                 <p className="text-xs font-semibold text-[#d97706] mb-3 flex items-center gap-1">
                   <FileText size={14} className="text-[#d97706]" />
                   Documents
                 </p>
                 <div className="grid grid-cols-2 gap-2">
                   {[
                     { label: "Resume", key: "resumeUrl", icon: "📄" },
                     { label: "10th", key: "tenthMarksheetUrl", icon: "📜" },
                     { label: "12th", key: "twelfthMarksheetUrl", icon: "📜" },
                     { label: "Last Sem", key: "lastSemesterMarkSheetUrl", icon: "📊" },
                   ].map((doc) => {
                     if (profile?.[doc.key]) {
                       return (
                         <a
                           key={doc.key}
                           href={profile[doc.key]}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group relative bg-gradient-to-r from-[#d97706]/5 to-[#b45309]/5 border border-[#d97706]/30 rounded-lg p-3 text-center hover:from-[#d97706]/10 hover:to-[#b45309]/10 hover:border-[#d97706]/50 hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col items-center gap-1"
                         >
                           {/* Icon */}
                           <div className="w-10 h-10 bg-gradient-to-br from-[#d97706]/20 to-[#b45309]/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                             <span className="text-lg">{doc.icon}</span>
                           </div>

                           {/* Label */}
                           <p className="text-xs font-semibold text-[#451a03] group-hover:text-[#d97706] transition-colors">
                             {doc.label}
                           </p>

                           {/* Download indicator */}
                           <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500/90 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white group-hover:bg-green-600 transition-all">
                             ✓
                           </div>
                         </a>
                       );
                     } else {
                       return (
                         <div
                           key={doc.key}
                           className="bg-gray-100/50 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center transition-all hover:bg-gray-100 cursor-not-allowed opacity-60"
                         >
                           <span className="text-lg mb-1 block">{doc.icon}</span>
                           <p className="text-xs text-gray-500 font-medium">{doc.label}</p>
                         </div>
                       );
                     }
                   })}
                 </div>
               </div>
             </div>

             {/* Edit Button */}
             <div className="border-t border-[#f1e6d3] p-4">
               <button
                 onClick={() => setIsEditing(true)}
                 className="w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 text-sm bg-[#d97706] hover:bg-[#b45309] text-white transition"
               >
                 <Edit3 size={16} />
                 Edit Profile
               </button>
             </div>
           </div>
         )}
       </div>
     </div>
   );
 }