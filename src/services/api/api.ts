import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios';

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`
    });

    this.instance.interceptors.request.use(
      (config): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
        if (!config.headers?.Authorization) {
          const lsToken = localStorage.getItem('token');
          const ssToken = sessionStorage.getItem('token');
          config.headers!.Authorization = `Bearer ${lsToken || ssToken}`;
        }
        return config;
      },
      (error): Promise<Error> => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response): AxiosResponse => {
        return response;
      },
      async (error): Promise<void | AxiosResponse<any> | Error> => {
        if (error.response) {
          if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
            // logout user
          }
          return Promise.reject(error.response.data);
        } else if (error.request) {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(path, config);
  }

  public post<T, R>(path: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return this.instance.post(path, data, config);
  }

  public put<T, R>(path: string, data: T): Promise<Promise<AxiosResponse<R>>> {
    return this.instance.put(path, data);
  }

  public patch<T, R>(
    path: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<R>> {
    return this.instance.patch(path, data, config);
  }

  public delete<T>(path: string): Promise<AxiosResponse<T>> {
    return this.instance.delete(path);
  }
}

export default new ApiService();
