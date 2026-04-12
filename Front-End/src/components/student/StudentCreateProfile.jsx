import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Loader, AlertCircle, CheckCircle, Upload } from "lucide-react";
import {fetchWithAuth} from "../../api/fetchWithAuth"


export default function StudentCreateProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

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
      // Validation
      if (!files.resume) {
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

      // JSON part
      formDataToSend.append(
        "data",
        new Blob([JSON.stringify(dtoData)], {
          type: "application/json",
        })
      );

      // Files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      const response = await fetchWithAuth("/student/create-profile", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          // Redirect to pending verification page
          navigate("/student/profile-pending");
        }, 1500);
      } else {
        const errResult = await response.json();
        setError(errResult.error?.message || "Failed to create profile.");
      }
    } catch (err) {
      setError("Server error. Please check your connection.");
      console.error("Profile creation error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#451a03] mb-2">
            Create Your Profile
          </h1>
          <p className="text-[#5d4037] text-lg">
            Complete your academic details to access placement opportunities
          </p>
        </div>

        {/* Notifications */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-semibold">Success!</p>
              <p className="text-green-700 text-sm">
                Your profile has been created. Redirecting to verification page...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Personal Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#451a03] mb-6">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#5d4037] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5d4037] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#451a03] mb-6">
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#5d4037] mb-2">
                  Enrollment Number *
                </label>
                <input
                  type="text"
                  name="studentEnrollmentNo"
                  value={formData.studentEnrollmentNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                  placeholder="Your enrollment number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5d4037] mb-2">
                  Branch *
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5d4037] mb-2">
                  CGPA *
                </label>
                <input
                  type="number"
                  name="cgpa"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                  placeholder="Your CGPA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5d4037] mb-2">
                  Passout Year *
                </label>
                <input
                  type="number"
                  name="passoutYear"
                  value={formData.passoutYear}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[#5d4037] mb-2">
                Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                placeholder="e.g., Java, Python, React"
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#451a03] mb-6">
              Upload Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: "resume", label: "Resume *" },
                { key: "tenth", label: "10th Marksheet" },
                { key: "twelfth", label: "12th Marksheet" },
                { key: "lastsemester", label: "Last Semester Marksheet" },
              ].map((doc) => (
                <div key={doc.key}>
                  <label className="block text-sm font-medium text-[#5d4037] mb-2">
                    {doc.label}
                  </label>
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-[#d6c7a1] rounded-lg cursor-pointer hover:bg-[#FFFFF0] transition">
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={20} className="text-[#d97706]" />
                      <span className="text-sm text-[#5d4037]">
                        {files[doc.key]
                          ? files[doc.key].name
                          : "Click to upload"}
                      </span>
                    </div>
                    <input
                      type="file"
                      name={doc.key}
                      onChange={handleFileChange}
                      required={doc.key === "resume"}
                      className="hidden"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#451a03] px-6 py-3 text-lg font-bold text-white hover:bg-[#2d1102] transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating Profile...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Profile
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="px-8 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
