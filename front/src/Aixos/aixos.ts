import axios from "axios";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const backPort = process.env.NEXT_PUBLIC_BACK_SERVER_PORT;

const Axios = axios.create({
  baseURL: `${baseURL}:${backPort}`,
  responseType: "json",

  // headers: { accept: "application/json", "Content-Type": "application/json" },

  withCredentials: true, //쿠키를 첨부해서 요청
  timeout: 30000 //30s
});

export default Axios;
