import { ApiService, ApiServiceBuilder } from './api.service';

interface PostQueryParams {
  page?: number;
  province_code?: string;
  type_id?: string;
}

const params = {
  page: 1,
  province_code: '\'1\'',
  district_code: '\'1\'',
  type_id: 'house',
};

export function getParsedParams(params: Record<string, any>): any {
  const parsedParams: any = {};

  if (params.page !== undefined){
    parsedParams.page = params.page
  }

  if (params.search !== undefined){
    parsedParams.search = params.search
  }

  if (params.page !== undefined) {
    parsedParams.page = params.page;
  }

  if (params.province_code !== undefined) {
    parsedParams['post_address->>province_code[eq]'] = `%27${params.province_code}%27`;
  }
  if (params.district_code !== undefined) {
    parsedParams['post_address->>district_code[eq]'] = `%27${params.district_code}%27`;
  }
  if (params.ward_code !== undefined) {
    parsedParams['post_address->>ward_code[eq]'] = `%27${params.ward_code}%27`;
  }

  if (params.type_id !== undefined) {
    parsedParams['post_type_id[eq]'] = `%27${params.type_id}%27`;
  }

  if (params.minPrice > 0 || params.maxPrice < 120000000000){
    parsedParams['post_price[btw]'] = `${params.minPrice}, ${params.maxPrice}`
  }

  if (params.minArea > 0 || params.maxArea < 10000){
    parsedParams['post_area[btw]'] = `${params.minArea}, ${params.maxArea}`
  }

  if (params.sortBy !== undefined) {
    if (params.sortBy === 'posted_date'){
      parsedParams.orders = `-${params.sortBy}`;
    }else {
      parsedParams.orders = `${params.sortBy}`;
    }
    
  }

  if (params.postBy !== undefined){
    parsedParams['post_is_pro_seller[eq]'] = params.postBy
  }

  return parsedParams;
}

console.log(getParsedParams(params));

new ApiServiceBuilder()
  .withUrl('/posts')
  .withParams(getParsedParams(params))
  .build()
  .get()
  .then((response: any) => {
    console.log(response.data);
  })
  .catch((error: any) => {
    console.log(error);
  });
