import axios from "axios";

// Create axios instance with default configuration
const apiClient = axios.create({
  // Sử dụng relative URL để tự động detect port hiện tại
  baseURL:
    process.env.NODE_ENV === "production" ? "https://your-domain.com" : "", // Empty string = same origin (tự động dùng port hiện tại)
  timeout: 10000,
  withCredentials: true, // Quan trọng: Gửi cookies tự động
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (process.env.NODE_ENV === "development") {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // ✅ Unauthorized - Session expired or invalid
      console.warn("🚫 Session expired or unauthorized");

      // Make sure error message includes 401 for AuthContext to catch
      error.message = `401 Unauthorized: ${error.message}`;
    } else if (error.response?.status >= 500) {
      // Server errors
      console.error("💥 Server error:", error.response.status);
    }

    if (process.env.NODE_ENV === "development") {
      console.error(
        `❌ ${error.response?.status || "Network Error"} ${error.config?.url}`
      );
    }

    return Promise.reject(error);
  }
);

export default apiClient;
