import type Address from '../models/address';
import { type PropertyFeatures } from '../models/features';
import { ApiServiceBuilder } from './api.service';
interface CreatePosData {
  type_id: string;
  status: string;
  title: string;
  description: string;
  features: PropertyFeatures;
  area: number;
  address: Address; // Define an appropriate type for your address JSON
  price: number;
  deposit: number | null;
  is_lease: boolean;
  images: string[];
  videos: string[];
  is_pro_seller: boolean;
}
interface GetProps {
  page?: number | null;
  queryParams?: Record<string, any> | null;
  headers?: Record<string, any> | null;
}
interface AppResponse {
  status: 'success' | 'error' | 'fail';
  message: string;
  num_of_pages: number | null;
  result: any;
}
class PostService {
  private static instance: PostService;
  private readonly api: ApiServiceBuilder;
  private constructor() {
    this.api = new ApiServiceBuilder();
  }

  public static getInstance(): PostService {
    if (PostService.instance === undefined || PostService.instance === null) {
      PostService.instance = new PostService();
    }

    return PostService.instance;
  }

  async getAllPosts({ page = 1, queryParams = null, headers = null }: GetProps): Promise<AppResponse> {
    try {
      const response = await this.api
        .withUrl('/posts')
        .withParams({ page, ...(queryParams ?? {}) })
        .withHeaders(headers ?? {})
        .build()
        .get();
      return response.data as any;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async createPost(post: CreatePosData) {
    const response = await this.api.withUrl('/posts/create').withBody(post).build().post();
    return response.data ?? null;
  }

  async updatePost(id: string, post: Partial<CreatePosData>) {
    const response = await this.api
      .withUrl('/posts/' + id)
      .withBody(post)
      .build()
      .patch();
    return response.data ?? null;
  }
}

export default PostService;
