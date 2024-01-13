import { FurnitureStatus } from '../constants/enums';
import type Address from '../models/address';
import { type PropertyFeatures } from '../models/features';
import { ApiServiceBuilder } from './api.service';
import AuthService from './auth.service';
import type { PropertyListing } from './CreatePostData';
import mediaServices from './media.services';
import UserService from './user.service';
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

  api() : ApiServiceBuilder{
    return new ApiServiceBuilder();
  }

  public static getInstance(): PostService {
    if (PostService.instance === undefined || PostService.instance === null) {
      PostService.instance = new PostService();
    }

    return PostService.instance;
  }

  async getAllPosts({ page = 1, queryParams = null, headers = null }: GetProps): Promise<AppResponse> {
    try {
      const response = await this.api()
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

  async createPost(post: PropertyListing) {
    const accessToken = await AuthService.getInstance().getAccessToken();
    if (accessToken === null) {
      throw new Error('Bạn chưa đăng nhập');
    }
    const images = post.images;
    const uploadImages = await mediaServices.uploadFiles(images);
    post.images = uploadImages;
    const response = await this.api()
      .withUrl('/posts/create')
      .withBody(post)
      .withHeaders({
        Authorization: `Bearer ${accessToken}`,
      })
      .build()
      .post();
    return response.data ?? null;
  }

  async updatePost(id: string, post: Partial<PropertyListing>) {
    const response = await this.api()
      .withUrl('/posts/' + id)
      .withBody(post)
      .build()
      .patch();
    return response.data ?? null;
  }

  async deletePost(id: string) {
    const accessToken = await AuthService.getInstance().getAccessToken();
    if (accessToken === null) {
      throw new Error('Bạn chưa đăng nhập');
    }
    const response = await this.api()
      .withUrl('/posts/' + id)
      .withHeaders({ 
        Authorization: `Bearer ${accessToken}`,
      })
      .build()
      .delete();
    console.log(response);
    return response.data ?? null;
  }
}

export default PostService;

// PostService.getInstance()
//   .createPost({
//     type_id: 'motel',
//     title: 'Trọ quận 7 gia re cho sinh viên',
//     description: 'Phòng trọ trong nhà nguyên căn ,k chung chủ , giờ giấc tự đo.diện 3,5k chữ , nước 50k người',
//     price: 2000000,
//     deposit: 20000,
//     area: 25,
//     images: [
//       'https://picsum.photos/200/300?random=112',
//       'https://picsum.photos/200/300?random=214',
//       'https://picsum.photos/200/300?random=3124',
//       'https://picsum.photos/200/300?random=144',
//     ],
//     address: {
//       province_code: 1,
//       district_code: 1,
//       ward_code: 1,
//       detail: '123 Main Street',
//     },
//     features: {
//       water_price: 3500,
//       electric_price: 2000,
//       furniture_status: FurnitureStatus.empty,
//     },
//     is_lease: true,
//     is_pro_seller: false,
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
