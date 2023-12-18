import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// export const login = async (username: string, password: string): Promise<any> => {
//   const response = await axios.post(`${BASE_URL}/login`, { username, password })
//   return response.body
// }

interface ApiServiceConfig {
  baseURL?: string;
  Url?: string;
  headers?: Record<string, any>;
  params?: Record<string, any>;
  body?: Record<string, any>;
}

export class ApiServiceBuilder {
  private readonly config: ApiServiceConfig = {};

  setBaseUrl(baseURL: string): this {
    this.config.baseURL = baseURL;
    return this;
  }

  withUrl(url: string): this {
    this.config.Url = url;
    return this;
  }

  withHeaders(headers: Record<string, string>): this {
    this.config.headers = headers;
    return this;
  }

  withParams(params: Record<string, any>): this {
    this.config.params = params;
    return this;
  }

  withBody(body: Record<string, any>): this {
    this.config.body = body;
    return this;
  }

  build(): ApiService {
    return new ApiService(this.config);
  }
}

export class ApiService {
  private readonly  isProduction = true;
  private readonly PRODUCTION_API_URL = 'https://nha-gia-re-server.onrender.com/api/v1';
  private readonly DEVELOPMENT_API_URL = 'http://localhost:8000/api/v1';
  private readonly API_URL = this.isProduction ? this.PRODUCTION_API_URL : this.DEVELOPMENT_API_URL;
  private readonly api: AxiosInstance;
  private readonly apiConfig: ApiServiceConfig;

  public constructor(config: ApiServiceConfig = {}) {
    this.api = axios.create({
      baseURL: config.baseURL ?? this.API_URL,
      headers: config.headers ?? {
        'Content-Type': 'application/json',
      },
      params: config.params ?? {},
    });
    this.apiConfig = config;
  }

  public async get<T>(): Promise<AxiosResponse<T>> {
    return await this.api.get(this.apiConfig.Url ?? '');
  }

  public async post<T>(): Promise<AxiosResponse<T>> {
    return await this.api.post(this.apiConfig.Url ?? '', this.apiConfig.body ?? {});
  }

  public async put<T>(): Promise<AxiosResponse<T>> {
    return await this.api.put(this.apiConfig.Url ?? '', this.apiConfig.body ?? {});
  }

  public async patch<T>(): Promise<AxiosResponse<T>> {
    return await this.api.patch(this.apiConfig.Url ?? '', this.apiConfig.body ?? {});
  }

  public async delete<T>(): Promise<AxiosResponse<T>> {
    return await this.api.delete(this.apiConfig.Url ?? '');
  }
}
