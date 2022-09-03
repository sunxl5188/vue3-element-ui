import axios, { AxiosRequestConfig } from "axios";
import "element-plus/es/components/message/style/index";
import { ElMessage } from "element-plus";
import store from "../store";

const message = (message: string, status?: number) => {
  ElMessage({
    type: "error",
    message: `${message},状态码==>${status}`,
  });
};

/**
 * 请求失败错误码统一处理
 * @param status
 * @param other
 */
const errorHandle = (status: number, other: string) => {
  // 状态码判断
  switch (status) {
    case 302:
      message("接口重定向了！");
      break;
    case 400:
      message(
        "发出的请求有错误，服务器没有进行新建或修改数据的操作==>",
        status
      );
      break;
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401: //重定向
      message("token:登录失效==>", status);
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      message("登录过期,用户得到授权，但是访问是被禁止的==>", status);
      break;
    case 404:
      message("网络请求不存在==>", status);
      break;
    case 406:
      message("请求的格式不可得==>", status);
      break;
    case 408:
      message(" 请求超时！");
      break;
    case 410:
      message("请求的资源被永久删除，且不会再得到的==>", status);
      break;
    case 422:
      message("当创建一个对象时，发生一个验证错误==>", status);
      break;
    case 500:
      message("服务器发生错误，请检查服务器==>", status);
      break;
    case 502:
      message("网关错误==>", status);
      break;
    case 503:
      message("服务不可用，服务器暂时过载或维护==>", status);
      break;
    case 504:
      message("网关超时==>", status);
      break;
    default:
      message("其他错误错误==>", status);
      console.log(other);
  }
};

interface pendingType {
  url?: string;
  method?: string;
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
  },
  timeout: 5000,
  withCredentials: false, // 表明跨域请求是否需要证明
  responseType: "json", // 'arraybuffer','blob','document','json','text',stream'
  responseEncoding: "utf8",
});

/**
 * 请求拦截器, 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config) => {
    removePending(config);
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c,
      });
    });
    if (store.state.vuex_token && config && config?.headers) {
      config.headers.Authorization = store.state.vuex_token;
      config.headers.Token = store.state.vuex_token;
    }
    return config;
  },
  (error) => {
    message(error.data.error.message);
    return Promise.reject(error.data.error.message);
  }
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  function (config) {
    // 请求成功
    if (config.status === 200 || config.status === 204) {
      return Promise.resolve(config.data);
    } else {
      return Promise.reject(config);
    }
  }, // 请求失败
  function (error) {
    const { response, config } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      // 超时重新请求
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
      store.commit("setNetwork", false);
    }
  }
);

/**
 * @get方法~查询数据
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export const fetch = (url: string, params?: object) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

/**
 * @post方法~添加数据
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export const post = (url: string, params: object) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

/**
 * @put方法~修改数据:将所有数据都推送到后端
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export const put = (url: string, params: object) => {
  return new Promise((resolve, reject) => {
    instance
      .put(url, params)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

/**
 * @patch~修改数据：只将修改的数据推送到后端
 * @param url
 * @param params
 */
export const patch = (url: string, params: object) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(url, params)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

/**
 * @delete~用于删除数据
 * @param url
 * @param params
 */
export const del = (url: string, params: object) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, { data: params })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
