

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send reset email");
      }

      setSuccess(result.data.message);

      setTimeout(() => {
              navigate("/reset-password");
            }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative grid min-h-screen place-items-center px-4 sm:px-6 py-16 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc]">
      <div className="container mx-auto grid place-items-center text-center">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[#e7dcc7]">
          <h2 className="text-3xl font-bold text-[#451a03] mb-2">Forgot Password</h2>
          <p className="text-[#5d4037] mb-6">
            Enter your email to receive  Verification OTP
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
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;