import axios from "axios";

// const BASE_URL = "http://localhost:8080";

const axiosPublic = axios.create({
  timeout: 5000,
  header: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  timeout: 12000,   
  header: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosPublic.interceptors.response.use(
  async (response) => {
    return await response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosPublic;
