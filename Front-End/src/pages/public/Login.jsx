import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔑 Login request
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Invalid email or password");
      }

      const data = await response.json();
      const accessToken = data?.data?.accessToken || data?.accessToken;

      if (!accessToken) {
        throw new Error("Login succeeded but no access token returned");
      }

      // Save token
      localStorage.clear();
      localStorage.setItem("token", accessToken);
      console.log("token successfully saved!");

      const userType = data?.data?.role;


      if (userType === "admin" || userType === "ADMIN") {
        navigate("/admin/drives", { state: { role: userType } });
      } else if (userType === "student" || userType === "STUDENT") {
        try {

          const profileResponse = await fetch(
            "http://localhost:8080/api/student/profile/verify",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            console.log(profileData.data.verified);

            const isVerified = profileData?.data?.verified;

           if (isVerified === true || String(isVerified) === "true") {
             navigate("/student/profile", { state: { role: userType } });
           } else {
             navigate("/student/profile-pending", { state: { role: userType } });
           }
          } else {

            navigate("/student/create-profile", { state: { role: userType } });
          }
        } catch (err) {
          console.error("Profile verification error:", err);
          navigate("/student/create-profile", { state: { role: userType } });
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative grid min-h-screen place-items-center px-4 sm:px-6 py-16 bg-gradient-to-b from-[#FFFFF0] to-[#f5f5dc]">
      <div className="container mx-auto grid place-items-center text-center">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[#e7dcc7]">
          <h2 className="text-3xl font-bold text-[#451a03] mb-2">Login</h2>
          <p className="text-[#5d4037] mb-6">
            Access your Training & Placement account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                User Name
              </label>
              <input
                type="email"
                name="username"
                placeholder="Enter your college email"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#d6c7a1] bg-white focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-[#d97706] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#451a03] px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#2d1102]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
