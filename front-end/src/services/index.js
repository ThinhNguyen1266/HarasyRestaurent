import axios from "axios";

const intance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
  header: {
    "Content-Type": "application/json",
  },
});

export default intance;
