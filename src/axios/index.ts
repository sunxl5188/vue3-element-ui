import axios, { AxiosRequestConfig, Method } from "axios";
import "element-plus/es/components/message/style/index";
import { ElMessage } from "element-plus";

/**
 * 请求失败错误码统一处理
 * @param status
 */
const errorHandle = (status: number, other: string) => {
  // 状态码判断
  switch (status) {
    case 302:
      ElMessage.error("接口重定向了！");
      break;
    case 400:
      ElMessage.error(
        "发出的请求有错误，服务器没有进行新建或修改数据的操作==>" + status
      );
      break;
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401: //重定向
      ElMessage.error("token:登录失效==>" + status);
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      ElMessage.error("登录过期,用户得到授权，但是访问是被禁止的==>" + status);
      break;
    case 404:
      ElMessage.error("网络请求不存在==>" + status);
      break;
    case 406:
      ElMessage.error("请求的格式不可得==>" + status);
      break;
    case 408:
      ElMessage.error(" 请求超时！");
      break;
    case 410:
      ElMessage.error("请求的资源被永久删除，且不会再得到的==>" + status);
      break;
    case 422:
      ElMessage.error("当创建一个对象时，发生一个验证错误==>" + status);
      break;
    case 500:
      ElMessage.error("服务器发生错误，请检查服务器==>" + status);
      break;
    case 502:
      ElMessage.error("网关错误==>" + status);
      break;
    case 503:
      ElMessage.error("服务不可用，服务器暂时过载或维护==>" + status);
      break;
    case 504:
      ElMessage.error("网关超时==>" + status);
      break;
    default:
      ElMessage.error("其他错误错误==>" + status);
      console.log(other);
  }
};

interface pendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: any;
}

const pending: Array<pendingType> = [];
const CancelToken = axios.CancelToken;

const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    if (Object.prototype.hasOwnProperty.call(pending, key)) {
      const item: number = +key;
      const list: pendingType = pending[key];
      // 当前请求在数组中存在时执行函数体
      if (
        list.url === config.url &&
        list.method === config.method &&
        JSON.stringify(list.params) === JSON.stringify(config.params) &&
        JSON.stringify(list.data) === JSON.stringify(config.data)
      ) {
        // 执行取消操作
        list.cancel("操作太频繁，请稍后再试");
        // 从数组中移除记录
        pending.splice(item, 1);
      }
    }
  }
};

/**
 * 实例化配置
 */
const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin-Type": "*",
  },
  timeout: 5000,
  withCredentials: false, // 表明跨域请求是否需要证明
  responseType: "json", // 'arraybuffer','blob','document','json','text',stream'
  responseEncoding: "utf8",
});

instance.interceptors.response.use(
  function (config) {
    removePending(config.config);
    // 请求成功
    if (config.status === 200 || config.status === 204) {
      return Promise.resolve(config);
    } else {
      return Promise.reject(config);
    }
  }, // 请求失败
  function (error) {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);

      // 超时重新请求
      const config = error.config;
      // 全局的请求次数,请求的间隙
      const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

      if (config && RETRY_COUNT) {
        // 设置用于跟踪重试计数的变量
        config.__retryCount = config.__retryCount || 0;
        // 检查是否已经把重试的总数用完
        if (config.__retryCount >= RETRY_COUNT) {
          return Promise.reject(response || { message: error.message });
        }
        // 增加重试计数
        config.__retryCount++;
        // 创造新的Promise来处理指数后退
        const backoff = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, RETRY_DELAY || 1);
        });
        // instance重试请求的Promise
        return backoff.then(() => {
          return instance(config);
        });
      }

      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 后续增加断网情况下做的一些操作
      // store.commit('networkState', false);
    }
  }
);

instance.interceptors.request.use((config) => {
  console.log(config);
  removePending(config);
  config.cancelToken = new CancelToken((c) => {
    console.log(config);
    pending.push({
      url: config.url,
      method: "post",
      params: config.params,
      data: config.data,
      cancel: c,
    });
  });
});

export const fetch = (url: string, params?: object) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export const post = (url: string, params?: object) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};
