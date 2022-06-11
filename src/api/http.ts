import axios from 'axios';

const token = 'jwttoken'; // 보통 Vuex, Pinia같은 State 관리 store에 저장

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
});

// request를 보내기 전 interceptor
instance.interceptors.request.use((config) => {
  // token의 만료 체크 (혹은 요청 후 만료되면 발급 후 재요청)
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    // token이 없다면, Login 요청 혹은 Refresh Token 사용 설정.
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res, // 성공했을 때 공통 처리
  (errors) => {
    // 공통 ERROR 처리
    switch (errors.response.status) {
      case 0:
        console.log('서버를 찾지 못함');
        break;
      case 404:
        console.log('요청 Path가 잘못됨');
        break;
      case 500:
        console.log('서버에 문제가 있음');
        break;
      default:
    }
    return Promise.reject(errors);
  },
);

export default instance;
