// src/pages/ResetPassword.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !otp || !newPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative grid min-h-screen place-items-center px-4 sm:px-6 py-16 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc]">
      <div className="container mx-auto grid place-items-center text-center">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[#e7dcc7]">
          <h2 className="text-3xl font-bold text-[#451a03] mb-2">Reset Password</h2>
          <p className="text-[#5d4037] mb-6">
            Enter your email, OTP, and new password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your college email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#5d4037] hover:text-[#451a03]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex-1 rounded-xl border border-[#d97706] px-6 py-3 text-sm font-bold text-[#d97706] hover:bg-[#f5d6a5]"
              >
                Back to Login
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-[#451a03] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#2d1102]"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;