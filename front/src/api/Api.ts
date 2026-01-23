import axios from 'axios';

const baseURL = `https://${process.env.NEXT_PUBLIC_DOMAIN}`;

const api = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
  timeout: 15000
});

api.interceptors.request.use(
  async (config) => {
    // 서버 환경에서만 동적 import 후 쿠키를 수동으로 주입 (next/headers 클라이언트 컴포넌트에서 사용 불가)
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = cookies();
      if (cookieStore.toString()) {
        config.headers['Cookie'] = cookieStore.toString();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;