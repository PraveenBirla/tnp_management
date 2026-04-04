import { useState, useEffect } from "react";
import { Save, Loader } from "lucide-react";
import {fetchWithAuth} from '../../api/fetchWithAuth'
export default function StudentProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    cgpa: "",
    studentEnrollmentNo: "",
    branch: "",
    passoutYear: new Date().getFullYear(),
    skills: "",
    resumeUrl: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await fetchWithAuth(
        "/student/profile",
      );

      // ❌ Profile not found
      if (!response.ok) {
        setProfile(null);
        setIsEditing(true);
        return;
      }

      const result = await response.json();
      console.log("API RESPONSE:", result);

      if (result && result.data) {
        setProfile(result.data);
        setFormData(result.data);
        setIsEditing(false); // show profile
      } else {
        setProfile(null);
        setIsEditing(true);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SAVE PROFILE (POST / PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const method = profile ? "PUT" : "POST";

      const response = await fetchWithAuth(
        "/student/profile",
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setProfile(result.data);
        setFormData(result.data);
        setIsEditing(false);
        setSuccess(true);

        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.message || "Failed to save profile");
      }
    } catch (err) {
      console.error(err);
      setError("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-700 text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] p-8">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#451a03]">
            My Profile
          </h1>

          {profile && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-[#d97706] hover:bg-[#b45309] text-white rounded-lg font-semibold transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
            Profile saved successfully!
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* CARD */}
        <div className="bg-[#fffdf7] rounded-2xl border border-[#f1e6d3] shadow-md p-8">
          {!profile && !isEditing ? (
            <div className="text-center">
              <p className="text-lg text-[#7c5e3c] mb-4">
                No profile found. Create one to get started!
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-[#d97706] hover:bg-[#b45309] text-white rounded-lg font-semibold"
              >
                Create Profile
              </button>
            </div>
          ) : isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input"
                  required
                />

                <input
                  type="text"
                  name="studentEnrollmentNo"
                  value={formData.studentEnrollmentNo}
                  onChange={handleChange}
                  placeholder="Enrollment No"
                  className="input"
                  required
                />

                <input
                  type="number"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  placeholder="CGPA"
                  className="input"
                  required
                />

                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CS">CS</option>
                  <option value="EC">EC</option>
                  <option value="ME">ME</option>
                  <option value="BC">BC</option>
                </select>

                <input
                  type="number"
                  name="passoutYear"
                  value={formData.passoutYear}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skills"
                className="input"
              />

              <input
                type="url"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleChange}
                placeholder="Resume URL"
                className="input"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#d97706] text-white rounded-lg"
                >
                  {saving ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Profile
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(profile);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p><b>Name:</b> {profile.fullName}</p>
              <p><b>Enrollment:</b> {profile.studentEnrollmentNo}</p>
              <p><b>CGPA:</b> {profile.cgpa}</p>
              <p><b>Branch:</b> {profile.branch}</p>
              <p><b>Year:</b> {profile.passoutYear}</p>

              {profile.skills && <p><b>Skills:</b> {profile.skills}</p>}

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}