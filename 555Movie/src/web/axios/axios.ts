import axios, { AxiosRequestConfig, AxiosPromise, Axios } from "axios";
import { storeToRefs } from "pinia";
import useMainStore from "../../store"

// import { ElLoading, LoadingOptions } from "element-plus";
// import { baseUrl1 } from "../../utils/urls";

// interface LoadingInstance {
//   target: any;
//   count: number;
// }
// interface Options {
//   // 是否开启取消重复请求, 默认为 true
//   CancelDuplicateRequest?: boolean;
//   // 是否开启loading层效果, 默认为false
//   loading?: boolean;
//   // 是否开启简洁的数据结构响应, 默认为true
//   reductDataFormat?: boolean;
//   // 是否开启接口错误信息展示,默认为true
//   showErrorMessage?: boolean;
//   // 是否开启code不为0时的信息提示, 默认为true
//   showCodeMessage?: boolean;
//   // 是否开启code为0时的信息提示, 默认为false
//   showSuccessMessage?: boolean;
//   // 当前请求使用另外的用户token
//   anotherToken?: string;
// }
// interface anyObj {
//   [key: string]: any;
// }

// const loadingInstance: LoadingInstance = {
//   target: null,
//   count: 0,
// };
// const pendingMap = new Map();
// // 创建axios
// function createAxios(
//   axiosConfig: AxiosRequestConfig,
//   options: Options = {},
//   loading: LoadingOptions = {}
// ): AxiosPromise {
//   const axiosInstance = axios.create({
//     baseURL: baseUrl1.baseUrl,
//     timeout: 1000 * 10,
//     headers: {},
//     responseType: "json",
//   });

//   options = Object.assign(
//     {
//       CancelDuplicateRequest: true, // 是否开启取消重复请求, 默认为 true
//       loading: false, // 是否开启loading层效果, 默认为false
//     },
//     options
//   );

//   // 请求拦截
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       // 移除重复请求
//       removePending(config);

//       // 储存每个请求的唯一cancel回调,并作为标识
//       options.CancelDuplicateRequest && addPending(config);

//       // 创建loading实例
//       if (options.loading) {
//         loadingInstance.count++;
//         if (loadingInstance.count === 1) {
//           loadingInstance.target = ElLoading.service(loading);
//         }
//       }

//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
//   );

//   // 响应拦截
//   axiosInstance.interceptors.response.use((res) => {
//     removePending(res.config);
//     options.loading && closeLoading(options); // 关闭loading

//     return res;
//   });

//   return axiosInstance(axiosConfig);
// }

// // 关闭Loading实例
// function closeLoading(options: Options) {
//   if (options.loading && loadingInstance.count > 0) loadingInstance.count--;
//   if (loadingInstance.count === 0) {
//     loadingInstance.target.close();
//     loadingInstance.target = null;
//   }
// }

// 储存每个请求的唯一cancel回调, 以此为标识
// function addPending(config: AxiosRequestConfig) {
//   const pendingKey = getPendingKey(config);
//   config.cancelToken =
//     config.cancelToken ||
//     new axios.CancelToken((cancel) => {
//       if (!pendingMap.has(pendingKey)) {
//         pendingMap.set(pendingKey, cancel);
//       }
//     });
// }

// // 删除重复的请求
// function removePending(config: AxiosRequestConfig) {
//   const pendingKey = getPendingKey(config);
//   if (pendingMap.has(pendingKey)) {
//     const cancelToken = pendingMap.get(pendingKey);
//     cancelToken(pendingKey);
//     pendingMap.delete(pendingKey);
//   }
// }

// // 生成每个请求的唯一key
// function getPendingKey(config: AxiosRequestConfig) {
//   let { data } = config;
//   const { url, method, params, headers } = config;
//   if (typeof data === "string") data = JSON.parse(data); // response里面返回的config.data是个字符串对象
//   return [
//     url,
//     method,
//     headers && (headers as anyObj).batoken ? (headers as anyObj).batoken : "",
//     headers && (headers as anyObj)["ba-user-token"]
//       ? (headers as anyObj)["ba-user-token"]
//       : "",
//     JSON.stringify(params),
//     JSON.stringify(data),
//   ].join("&");
// }

// export default createAxios;




function getRandomNum(length) {
  let res = "";
  for (let i = 0; i < length; i++) {
    res += Math.ceil(Math.random() * 10);
  }
  return res;
}

function Service(params = {}) {
    const service = axios.create({
        baseURL: "/apis.php",
        method : 'get',
      timeout: 1000 * 10,
      params: {
        out: "jsonp",
        cb: "jQuery" + getRandomNum(21) + "_" + getRandomNum(13),
        _: getRandomNum(13),
        wd: params.wd || null,
          flag: params.flag || null,
        id : params.id || null,
      },
    });

    // 请求拦截器
    service.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {}
    );

    //  响应拦截器
    service.interceptors.response.use((res) => {
      const startIndex = res.data.indexOf("{");
      const endIndex = res.data.lastIndexOf("}");
      return JSON.parse(res.data.substring(startIndex, endIndex + 1));
    });

    return service.get('/apis.php');
}


export default Service;

















