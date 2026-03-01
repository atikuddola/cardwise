import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000",
});

export default API;