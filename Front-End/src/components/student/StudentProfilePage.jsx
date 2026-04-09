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

  // 1. Unified Form State
  const [formData, setFormData] = useState({
    fullName: "",
    cgpa: "",
    studentEnrollmentNo: "",
    branch: "",
    passoutYear: new Date().getFullYear(),
    skills: "",
    phoneNumber: "",
  });

  // 2. File State
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

        console.log("Profile exists ✅");

        // 🔥 Profile exists → now check verification
        if (!isVerified) {
          navigate("/student/profile-pending");
          return;
        }

        // ✅ Verified → allow access
        setIsVerified(true);
        setVerificationChecked(true);

        // Fetch full profile
        await fetchProfile();

      } else {

        console.log("Profile not created ❌");
        navigate("/student/create-profile");
      }

    } catch (err) {
      console.error("Verification error:", err);
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
        setIsEditing(true); // Default to edit mode if no profile exists
        return;
      }

      const result = await response.json();
      if (result?.data) {
        setProfile(result.data);
        // Sync form with fetched data
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
      // ✅ Validation (important)
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

      // ✅ JSON part
      formDataToSend.append(
        "data",
        new Blob([JSON.stringify(dtoData)], {
          type: "application/json",
        })
      );

      // ✅ FILES
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      const response = await fetchWithAuth("/student/get-profile", {
        method: profile ? "PUT" : "POST",
        body: formDataToSend,
      });
       console.log("PROFILE RESPONSE:",  response);
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        await fetchProfile();
        setIsEditing(false);

        // reset files
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

  // Only show navbar if profile is verified
  return (



      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
              <p className="text-gray-600 mt-2">
                Keep your academic records up to date for placements.
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-md"
              >
                <Edit3 size={18} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Notifications */}
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-semibold">Success!</p>
                <p className="text-green-700">Your profile has been saved.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8">
              {/* Input Groups */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CGPA
                    </label>
                    <input
                      type="number"
                      name="cgpa"
                      step="0.01"
                      value={formData.cgpa}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enrollment No.
                    </label>
                    <input
                      type="text"
                      name="studentEnrollmentNo"
                      value={formData.studentEnrollmentNo}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Branch
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Branch</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passout Year
                    </label>
                    <input
                      type="number"
                      name="passoutYear"
                      value={formData.passoutYear}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Document Upload Grid */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Upload Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(files).map((fileKey) => (
                      <div key={fileKey}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {fileKey.replace("lastsemester", "Last Semester Marksheet")}
                        </label>
                        <label className="flex items-center justify-between px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <span className="text-sm text-gray-600">
                            {files[fileKey] ? files[fileKey].name : "Select File"}
                          </span>
                          <Upload size={18} className="text-indigo-600" />
                          <input
                            type="file"
                            name={fileKey}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 font-bold rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Uploading to Cloud...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Finalize Profile
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-4 border-2 border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* View Mode: Profile Card */
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-12">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <User size={48} className="text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{profile?.fullName}</h2>
                    <p className="text-indigo-100 text-lg">{profile?.branch}</p>
                    <p className="text-indigo-200">Batch {profile?.passoutYear}</p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8 space-y-8">
                {/* Academic Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap size={24} className="text-indigo-600" />
                    Academic Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Enrollment No.</p>
                      <p className="text-lg text-gray-900">{profile?.studentEnrollmentNo}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Current CGPA</p>
                      <p className="text-lg text-gray-900">{profile?.cgpa}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone size={24} className="text-indigo-600" />
                    Contact Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm font-semibold text-gray-600">Phone Number</p>
                    <p className="text-lg text-gray-900">{profile?.phoneNumber}</p>
                  </div>
                </div>

                {/* Skills */}
                {profile?.skills && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Code size={24} className="text-indigo-600" />
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills
                        .split(",")
                        .map((skill) => (
                          <span
                            key={skill.trim()}
                            className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Files */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={24} className="text-indigo-600" />
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Resume", key: "resumeUrl" },
                      { label: "10th Marksheet", key: "tentMarksheetUrl" },
                      { label: "12th Marksheet", key: "twelfthMarksheetUrl" },
                      { label: "Semester Results", key: "lastSemesterMarkSheetUrl" },
                    ].map((doc) =>
                      profile?.[doc.key] ? (
                        <a
                          key={doc.key}
                          href={profile[doc.key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 hover:bg-indigo-100 transition"
                        >
                          <p className="text-sm font-semibold text-indigo-900">{doc.label}</p>
                          <p className="text-xs text-indigo-600 mt-1">Download</p>
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

  );
}
