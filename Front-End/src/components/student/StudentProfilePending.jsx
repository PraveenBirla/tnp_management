import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle, AlertCircle, LogOut } from "lucide-react";
import {fetchWithAuth} from "../../api/fetchWithAuth";
export default function StudentProfilePending() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkVerificationStatus();
    // Check verification status every 5 seconds
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkVerificationStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchWithAuth(
        '/student/profile/verify',
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfile(data?.data);

        // If profile is verified, redirect to profile page
        if (data?.data?.isVerified === true) {
          console.log("[v0] Profile verified! Redirecting...");
          navigate("/student/profile");
        }
      }
    } catch (err) {
      console.error("Error checking verification status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
            <Clock size={40} className="text-amber-600 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#451a03] text-center mb-4">
          Profile Under Verification
        </h1>

        {/* Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-[#5d4037] text-center">
            Your profile has been submitted successfully. Our team is reviewing your
            documents. This process typically takes 1-2 business days.
          </p>
        </div>

        {/* Profile Info */}
        {profile && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Name
              </p>
              <p className="text-[#451a03] font-semibold">{profile.fullName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Enrollment Number
              </p>
              <p className="text-[#451a03] font-semibold">
                {profile.studentEnrollmentNo}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Branch
              </p>
              <p className="text-[#451a03] font-semibold">{profile.branch}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={16} className="text-amber-600" />
                <p className="text-amber-600 font-semibold">Pending Verification</p>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2">
            What happens next?
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">1.</span>
              <span>Admin team reviews your documents</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">2.</span>
              <span>You&apos;ll be notified once verification is complete</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold mt-0.5">3.</span>
              <span>Full access to placement drives and resources</span>
            </li>
          </ul>
        </div>

        {/* Refresh Hint */}
        <p className="text-xs text-gray-500 text-center mb-6">
          This page automatically checks for verification updates every 5 seconds.
          Feel free to refresh or come back later.
        </p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
