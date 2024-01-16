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

export function getParsedParams(urlSearchParams: URLSearchParams): any {

  const params: any = {};

  urlSearchParams.forEach((value: string, key: string) => {
    params[key] = value;
  });

  const parsedParams: any = {};
  if (params.page !== undefined) {
    parsedParams.page = params.page;
  }

  if (params.province_code !== undefined) {
    parsedParams['post_address->>province_code[eq]'] = '\'' + params.province_code + '\'';
  }

  if (params.type_id !== undefined) {
    parsedParams['post_type_id[eq]'] = '\'' + params.type_id + '\'';
  }
  if (params.is_lease !== undefined) {
    parsedParams['post_is_lease[eq]'] = params.is_lease;
  }
  if (params.search !== undefined && params.search !== '') {
    parsedParams.search = params.search;
  }
  if (params.min_price !== undefined || params.max_price !== undefined) {
    const minPrice = params.min_price !== undefined ? isNaN(params.min_price) ? 0 : params.min_price : 0;
    const maxPrice = params.max_price !== undefined ? isNaN(params.max_price) ? 100000000000 : params.max_price : 100000000000;
    parsedParams['post_price[btw]'] = minPrice + ',' + maxPrice;
  }
  

  return parsedParams;
}

// console.log(getParsedParams(params));

// new ApiServiceBuilder()
//   .withUrl('/posts')
//   .withParams(getParsedParams(params))
//   .build()
//   .get()
//   .then((response: any) => {
//     console.log(response.data);
//   })
//   .catch((error: any) => {
//     console.log(error);
//   });
