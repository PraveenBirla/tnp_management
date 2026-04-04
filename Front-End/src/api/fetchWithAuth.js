// api.js
import { useNavigate } from "react-router-dom";

 const BASE_URL  = "http://localhost:8080/api"

 export async function fetchWithAuth(endpoint, options = {}) {
   let token = localStorage.getItem("token");

   // Attach Authorization header
   options.headers = {
     ...(options.headers || {}),
     Authorization: `Bearer ${token}`,
     "Content-Type": "application/json"
   };

   let response = await fetch(`${BASE_URL}${endpoint}`, options);

   // If access token expired → try refresh
  if (response.status === 401 || response.status === 403) {
    // Try refresh only for 401 (expired token)
    if (response.status === 401) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        localStorage.setItem("token", data.data.accessToken);
        options.headers.Authorization = `Bearer ${data.data.accessToken}`;
        response = await fetch(`${BASE_URL}${endpoint}`, options);
      } else {
        localStorage.removeItem("token");
        window.location.replace("/login"); // ✅ force redirect
        throw new Error("Session expired");
      }
    } else {

      localStorage.removeItem("token");
      window.location.replace("/login"); // ✅ force redirect
      throw new Error("Unauthorized role");
    }
  }

   return response;
 }
