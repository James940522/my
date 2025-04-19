import axios from 'axios';

export const ClientInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 예시 API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
ClientInstance.interceptors.request.use(
  (config) => {
    // 요청 전 처리 (JWT 토큰 추가 등)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
ClientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
); 