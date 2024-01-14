import { ApiService, ApiServiceBuilder } from './api.service';

interface PostQueryParams {
  page?: number;
  province_code?: string;
  district_code?: string;
  ward_code?: string;
  type_id?: string;
}

const params = {
  page: 1,
  province_code: '\'1\'',
  district_code: '\'1\'',
  type: 'house',
};

function getParsedParams(params: Record<string, any>): any {
  const parsedParams: any = {};
  if (params.page !== undefined) {
    parsedParams.page = params.page;
  }

  if (params.province_code !== undefined) {
    parsedParams['post_address->>province_code[eq]'] = params.province_code;
  }

  if (params.district_code !== undefined) {
    parsedParams['post_address->>district_code[eq]'] = params.district_code;
  }

  if (params.ward_code !== undefined) {
    parsedParams['post_address->>ward_code[eq]'] = params.ward_code;
  }

  if (params.type !== undefined) {
    parsedParams['post_type_id[eq]'] = '\'' + params.type + '\'';
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
