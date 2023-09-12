import axios, { AxiosError, AxiosResponse } from 'axios';
import { Toast } from 'react-vant';
import { useUserStore } from '@/store/user';

// 创建新的axios实例
const service = axios.create({
  // 公共接口
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 5000,
});

// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
    // 每次发送请求之前判断pinia中是否存在token,如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    const token = useUserStore.getState().token;

    if (token) {
      config.headers.Authorization = token;
    }

    //设置loading
    Toast.loading({
      message: '加载中...',
      duration: 0, //一直存在
      forbidClick: true, //禁止点击
    });
    // 数据转换,判断数据格式为formdata还是json格式
    // json格式
    // config.data = JSON.stringify(config.data);
    return config;
  },
  (error: AxiosError) => {
    //出现请求错误，清除toast
    Toast.clear();
    // 请求错误，这里可以用全局提示框进行提示
    Toast.fail({
      message: '请求错误，请稍后再试',
      duration: 5,
    });
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      // 接口网络请求成功，关闭等待提示
      Toast.clear();
      if (data.code === 200) {
        // 接口请求结果正确
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  },
  (error: AxiosError) => {
    // 响应失败，关闭等待提示
    Toast.clear();
    // 提示错误信息
    if (JSON.stringify(error).includes('Network Error')) {
      Toast.fail({
        message: '网络超时',
        duration: 5,
      });
    }

    return Promise.reject(error);
  }
);

export default service;
