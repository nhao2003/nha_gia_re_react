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
  if (params.page !== undefined) {
    parsedParams.page = params.page;
  }

  if (params.province_code !== undefined) {
    parsedParams['post_address->>province_code[eq]'] = params.province_code;
  }

  if (params.type_id !== undefined) {
    parsedParams['post_type_id[eq]'] = params.type_id;
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
