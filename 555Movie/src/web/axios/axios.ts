import axios, {
  AxiosInstance,
} from "axios";


interface AxiosParams {
  out?: string;
  cb?: string;
  _?: string;
  wd?: any;
  flag?: any;
  id?: any;
}
interface requestInterceptorsHandleRes {
  configHandle: (config) => any;
  errorHandle: (err) => any;
}
interface responseInterceptorsHandleRes {
  configHandle: (res) => any;
  errorHandle: (err) => any;
}
// 封装axios实例
class AxiosService {
  private _baseURL: string;
  private _timeout: number;
  private _service: AxiosInstance | null;
  private _params: AxiosParams = {};
  private _paramsArg: AxiosParams = {};

  constructor() {
    this._baseURL = "/apis.php";
    this._timeout = 1000 * 10;
    this._service = null;
  }

  // 初始化axios实例
  _init() {
    this._params = {
      out: "jsonp",
      cb: "jQuery" + this._getRandomNum(21) + "_" + this._getRandomNum(13),
      _: this._getRandomNum(13),
      wd: this._paramsArg?.wd || null,
      flag: this._paramsArg?.flag || null,
      id: this._paramsArg?.id || null,
    };

    this._service = axios.create({
      baseURL: this._baseURL,
      timeout: this._timeout,
      params: this._params,
    });

    // 配置请求和响应拦截器
    const requestInterceptorsHandleRes = this._requestInterceptorsHandle();
    const responseInterceptorsHandleRes = this._responseInterceptorsHandle();

    this._service.interceptors.request.use(
      requestInterceptorsHandleRes.configHandle,
      requestInterceptorsHandleRes.errorHandle,
      {
        synchronous: true,
      }
    );
    this._service.interceptors.response.use(
      responseInterceptorsHandleRes.responseHandle,
      responseInterceptorsHandleRes.errorHandle
    );
  }

  // 请求拦截器处理函数
  _requestInterceptorsHandle(): requestInterceptorsHandleRes {
    const configHandle = (config) => {
      return config;
    };
    const errorHandle = (err) => {};

    return {
      configHandle,
      errorHandle,
    };
  }

  // 响应拦截器处理函数
  _responseInterceptorsHandle() {
    const responseHandle = (res) => {
      const startIndex = res.data.indexOf("{");
      const endIndex = res.data.lastIndexOf("}");
      return JSON.parse(res.data.substring(startIndex, endIndex + 1));
    };
    const errorHandle = (err) => {
      if (err.response.status === 401) {
      }

      return Promise.reject(err);
    }

    return {
      responseHandle,
      errorHandle,
    }
  }

  _getRandomNum(length) {
    let res = "";
    for (let i = 0; i < length; i++) {
      res += Math.ceil(Math.random() * 10);
    }
    return res;
  }

  // GET
  get(params: AxiosParams) {
    this._paramsArg = params;
    this._init();
    return this._service?.get(this._baseURL);
  }
}

const service = new AxiosService();
export const getService = service.get.bind(service);
