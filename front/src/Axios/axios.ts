import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACK_URL;

const Axios = axios.create({
  baseURL,
  responseType: "json",

  // headers: { accept: "application/json", "Content-Type": "application/json" },

  withCredentials: true, //쿠키를 첨부해서 요청
  timeout: 30000 //30s
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!navigator.onLine) {
      window.location.href = '/offline';
    }
    return error;
  }
);

export default Axios;
