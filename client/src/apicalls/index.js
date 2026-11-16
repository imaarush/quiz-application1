import axios from "axios";

const axiosInstance = axios.create();

// Use an interceptor so the token is read fresh on every request,
// not just once when the module loads
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
